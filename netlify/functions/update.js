exports.handler = async function(event, context) {
 
 console.log(event)

 if (event.httpMethod === 'POST') {

 	  return {
	      statusCode: 200,
	      body: JSON.stringify({message: "Hello World"})
	  };
		
	}

}