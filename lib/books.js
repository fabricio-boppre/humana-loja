import { readCMS } from './sanity'

// Library of functions and data for books:
// - Available books: with stock_situation "disponivel" or "esgotado_visivel").

// Get the available books for the request and the number of pages needed to show them:
export async function getBooks(page, totalItensPerPage, formatsToFilterArray, conditionsToFilterArray) {

	// Let's create a string with the filters to request to our CMS:
	// - We start the string with the type "book" and the stock situation "available":
	var QueryFilters = '*[_type == "book" && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")'
	// - Now we check if there are format filters; if yes, then we add them to the string:
	if (formatsToFilterArray.length > 0) {
		const formatsToFilterString = '["' + formatsToFilterArray.join('","') + '"]'
		QueryFilters = QueryFilters + ' && (format[0] in ' + formatsToFilterString + ')'
	}
	// - Now we check if there are condition filters; if yes, then we add them to the string:
	if (conditionsToFilterArray.length > 0) {
		const conditionsToFilterString = '["' + conditionsToFilterArray.join('","') + '"]'
		QueryFilters = QueryFilters + ' && (condition[0] in ' + conditionsToFilterString + ')'
	}
	// Finally, we close our string:
	QueryFilters = QueryFilters + ']'

	// Get the books count:
	const booksTotalCountQuery = 'count('+QueryFilters+')';
	const booksTotalCount = await readCMS.fetch(booksTotalCountQuery)
	
	// Calculate the total number of pages for these books (if there are any):
	// - The Math.ceil() function always rounds a number up to the next largest integer.
	var pagesTotal = 0
	if (booksTotalCount > 0) {
		pagesTotal = Math.ceil(booksTotalCount/totalItensPerPage)
	}
	
	// If there are no books or a non-existent page is requested, we return null:
	// - The non-existent page check is just for precaution, in case someone manipulates the page parameter in the URI.
	if ((page < 1) || (page > pagesTotal) || (booksTotalCount == 0)) {
		return {books: null,
						pagesTotal: 0,
					  booksTotal: 0}

	// Otherwise, we proceed:
	} else {

		// Calculate the offset for the requested page (the indexes for the first and the last book of this page):
		var firstItem
		if (page == 1) {
			// - The first index in an array is 0:
			firstItem = 0 
		} else {
			firstItem = (page-1) * totalItensPerPage
		}
		var lastItem = (page * totalItensPerPage) - 1
		// - If the index of the last item exceeds the total number of items, it assumes the total number of items (minus 1, because first index in an array is 0):
		if ((lastItem + 1) > booksTotalCount) {
			lastItem = booksTotalCount - 1
		}
		
		// Build the query to fetch the books:
		const booksQuery = QueryFilters + 
							`{"id": _id, 
                title,
								slug,
								"stock_situation": stock_situation[0],
								"authors": authors[]->{name},
                description, 
                price, 
								price_discount,
                weight,
								format, 
								file_guid,
								width,
								length,
								height,
                "mainImageUrl": main_image.asset->url}
							 |order(title asc)
							 [${firstItem}..${lastItem}]`;
	
		// Fetch the books:
		const books = await readCMS.fetch(booksQuery)

  	return {books: books,
						pagesTotal: pagesTotal,
					  booksTotal: booksTotalCount}
	
	}
}
