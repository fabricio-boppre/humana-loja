import { readCMS } from '../../lib/sanity'

async function sendGetRequest(url) {
  let result
  await fetch(url, {method: 'GET'})
    .then(function(response) {
      result = response.status
    })
    .catch(function(err) {
      result = err
    });
  return result
}

async function discoverDocType(id) {
  const docQuery = '*[_id == "'+id+'"]{_type}[0]._type'
  let result
  await readCMS.fetch(docQuery)
    .then(function(response) {
      result = response
    })
    .catch(function(err) {
      result = err
    });
  return result
}
  
export default async function contentChange(req, res) {

  // This route receives the callbacks that our CMS (Sanity) sends when the content is changed there;
  // Then, it proceeds to send some strategic GET requests to the frontend, to force the update of pages that show content that was changed;
  // These updates happen because our frontend uses Static Generation & Incremental Static Regeneration to make their content fetches: when this is the case, the pages are always regenerated 1 second (this value is set in getStaticProps) after a request come;
  // This way, sending these requests and regenerating the pages by ourselves, it means that visitors will always see the site properly updated (otherwise, the first visitor of a page that shows changed content would still see it out of date; just after him -- after his request -- it would be updated).
  // This strategy will be unnecessary when Next.js launches automatic content regeneration after changes to the CMS, which they are currently implementing.
  // - req: An instance of http.IncomingMessage (https://nodejs.org/api/http.html#http_class_http_incomingmessage);
  // - res: An instance of http.ServerResponse (https://nodejs.org/api/http.html#http_class_http_serverresponse).

  // The HTTP method that we expect is POST, so we check this before starting processing it:
  if (req.method === 'POST') {

    // Declaring some constants:
    // - It's enough to get the first element of the changed documents array because we are dealing with changes in one document at a time:
    const docId = req.body.ids.all[0]
    const frontPageURL = process.env.FRONT_PAGE_URL
    // console.log(req.body)

    // If the action was an update:
    if (req.body.ids.updated.length > 0) {

      // First, let's discover the type of the updated document: 
      const docType = await discoverDocType(docId)
      // console.log('updated doc: '+docType)
  
      // If the document is a book:
      if (docType == 'book') {
        
        // We have to regenerate the page of the book, sending a GET request to its URL:
        var bookURL = frontPageURL + 'livro/' + docId
        var getRequestResult = await sendGetRequest(bookURL)
        // console.log('fetch do livro updated: ' + getRequestResult)
        
        // We also have to regenerate the front page, sending a GET request to its URL:
        var getRequestResult = await sendGetRequest(frontPageURL)
        // console.log('fetch da front page after update: ' + getRequestResult)
      }    
    
    // If the action was a create:
    } else if (req.body.ids.created.length > 0) {

      // First, let's discover the type of the created document: 
      var docType = await discoverDocType(docId)
      // console.log('created doc: '+docType)
  
      // If the document is a book (or it's null -- for the cases when Sanity weirdly gives me null...):
      if ((docType == 'book') || (docType === null)) {
        
        // We have to regenerate the front page, sending a GET request to its URL:
        var getRequestResult = await sendGetRequest(frontPageURL)
        // console.log('fetch da front page after new book created: ' + getRequestResult)
      }    

    // Finally, if the action was a delete:
    } else if (req.body.ids.deleted.length > 0) {

      // As we can't know the type of the document (because it doesn't exist anymore on the CMS), then, just to be sure, we regenerate the front page, sending a GET request to its URL:
      var getRequestResult = await sendGetRequest(frontPageURL)
      // console.log('fetch da front page after some deletion: ' + getRequestResult)

    } 

    // A message explaining what was done:
    res.status(200).json({ message: 'After a content change at our CMS, GET requests were sent to the frontend, to force regeneration of pages affected by the content change.' })

  } else {
    // A message explaining that nothing was done:
    res.status(200).json({ message: 'There is nothing to do here.'})        
  }

}