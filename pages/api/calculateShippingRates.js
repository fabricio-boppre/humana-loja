import { readCMS } from '../../lib/sanity'

// Function to get the pre-defined dimensions of a book:
async function getPreDefinedDimensions(id) {
  const docQuery = '*[_id == "'+id+'"][0].measures[0]'
  let perfil
  await readCMS.fetch(docQuery)
    .then(function(response) {
      perfil = response
    })
    .catch(function(err) {
      perfil = err
    });
	let dimensions
	// Big book:
	if (perfil == 'grande') {
		dimensions = {width: 30, height: 7, length: 35}
	// Small book:
	} else if (perfil == 'pequeno') {
		dimensions = {width: 11, height: 1, length: 18}
	// Medium book (or profile not chosen):
	} else {
		dimensions = {width: 16, height: 2, length: 23}
	}
	return dimensions
}

// Function to calculate Correios (mail service in Brazil) shipping prices:
async function getCorreiosShippingResponse(serviceCode, totalWeight, totalHeight, largestWidth, largestLength, postalCodeDestiny, postalCodeOrigin) {
	// First, we need to convert the weight to kilos (it comes in grams from Snipcart): 
	const totalWeightKg = totalWeight/1000
	// Then we fetch the shipping data from Correios:
	const ShippingXMLResponse = await fetch('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem='+postalCodeOrigin+'&sCepDestino='+postalCodeDestiny+'&nVlPeso='+totalWeightKg+'&nCdFormato=1&nVlComprimento='+largestLength+'&nVlAltura='+totalHeight+'&nVlLargura='+largestWidth+'&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico='+serviceCode+'&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3')
  .then(response => response.text())
	// Our response is a XML; let's convert it to JSON: 
	var x2js = require("x2js")
	var converter = new x2js()
	var ShippingJSONResponse = converter.xml2js(ShippingXMLResponse)
	return ShippingJSONResponse
}

export default async function calculateShippingRates(req, res) {

  // This route receives an HTTP POST request sent by Snipcart. The request body will contain all the current order details, so we can calculate the shipping rates.
  // - req: An instance of http.IncomingMessage (https://nodejs.org/api/http.html#http_class_http_incomingmessage);
  // - res: An instance of http.ServerResponse (https://nodejs.org/api/http.html#http_class_http_serverresponse).

  // The HTTP method that we expect is POST, so we check this before starting processing it:
	// (We also check if there's at least one item in the cart — otherwise, there's nothing to do here.)
  if (req.method === 'POST' && req.body.content.itemsCount > 0) {

		// Let's prepare the information that we need to calculate the shipping rates:
		// - Books:
    const books = req.body.content.items
		// - Total weight [in grams] (we add an extra weight to take the packaging into account):
		const totalWeight = (req.body.content.totalWeight + 100)
		// - Postal code of the buyer (excluding all non-numeric characters):
		const postalCodeDestiny = req.body.content.shippingAddress.postalCode.replace(/\D/g,'')
		// - Postal code of the store:
		const postalCodeOrigin = '89801050'
		// - Total height [in centimeters] (sum of all heights considering each item quantity):
		var totalHeight = 0
		for (var i in books) {
			// If the book has specific dimensions (they prevail over any pre-defined dimensions):
			if (books[i].hasDimensions) {
				totalHeight += (books[i].height * books[i].quantity)
			// Else, if the book has pre-defined dimensions:
	 		} else {
				const PreDefinedDimensions = await getPreDefinedDimensions(books[i].id)
				const PreDefinedHeight = PreDefinedDimensions.height
				totalHeight += (PreDefinedHeight * books[i].quantity)
			}
		}
		// - Width [in centimeters] (the largest one):
		var largestWidth = 0
		var newWidth
		for (var i in books) {
			// If the book has specific dimensions (they prevail over any pre-defined dimensions):
			if (books[i].hasDimensions) {
				newWidth = books[i].width
			// Else, if the book has pre-defined dimensions:
	 		} else {
				const PreDefinedDimensions = await getPreDefinedDimensions(books[i].id)
				newWidth = PreDefinedDimensions.width
			}
			// Now we check if it is the largest:
			if (newWidth > largestWidth) {
				largestWidth = newWidth
			}
		}
		// - Length [in centimeters] (the largest one):
		var largestLength = 0
		var newLength
		for (var i in books) {
			// If the book has specific dimensions (they prevail over any pre-defined dimensions):
			if (books[i].hasDimensions) {
				newLength = books[i].length
			// Else, if the book has pre-defined dimensions:
	 		} else {
				const PreDefinedDimensions = await getPreDefinedDimensions(books[i].id)
				newLength = PreDefinedDimensions.length
			}
			// Now we check if it is the largest:
			if (newLength > largestLength) {
				largestLength = newLength
			}
		}

		// console.log('totalWeight: ' + totalWeight)
		// console.log('totalHeight: ' + totalHeight)
		// console.log('largestWidth: ' + largestWidth)
		// console.log('largestLength: ' + largestLength)
	
		// Now we start the array with the shipping methods and their prices:
		let rates = { "rates": [] }
		
		// Calculate "SEDEX à vista (04014)" shipping method:
		// - If there wasn't errors in the Correios response, then we add it to our shipping methods array;
		// - We have to convert the brazilian decimal representation standard (1.000,00) to the Snipcart one (1,000.00).
		const correiosSEDEXResponse = await getCorreiosShippingResponse('04014', totalWeight, totalHeight, largestWidth, largestLength, postalCodeDestiny, postalCodeOrigin)
		if (correiosSEDEXResponse.Servicos.cServico.Erro == '0') {
			rates["rates"].push({
				"description": "SEDEX à vista (prazo de entrega: " + correiosSEDEXResponse.Servicos.cServico.PrazoEntrega + " dia(s))",
				"cost": correiosSEDEXResponse.Servicos.cServico.Valor.replace('.', '').replace(',', '.')
			})
		}

		// Calculate "PAC à vista (04510)" shipping method:
		// - If there wasn't errors in the Correios response, then we add it to our shipping methods array;
		// - We have to convert the brazilian decimal representation standard (1.000,00) to the Snipcart one (1,000.00).
		const correiosPACResponse = await getCorreiosShippingResponse('04510', totalWeight, totalHeight, largestWidth, largestLength, postalCodeDestiny, postalCodeOrigin)
		if (correiosPACResponse.Servicos.cServico.Erro == '0') {
			rates["rates"].push({
				"description": "PAC à vista (prazo de entrega: " + correiosPACResponse.Servicos.cServico.PrazoEntrega + " dia(s))",
				"cost": correiosPACResponse.Servicos.cServico.Valor.replace('.', '').replace(',', '.')
			})
		}

		// Calculate "Registro Módico" shipping method:
		// - Only for packages under 2 Kg;
		// - We also check the zip code, to check if it is within the brazilian territory (01000-000 to 99999-99)
		if ((totalWeight <= 2000) && 
		    (parseInt(postalCodeDestiny) >= '01000000') && 
				(parseInt(postalCodeDestiny) <= '99999999')) {
			let registroModicoValor
			const registroModicoTaxa = 3.2
			if (totalWeight <= 20 ) {
				registroModicoValor = 1.3
			} else if (totalWeight > 20 && totalWeight <= 50) {
				registroModicoValor = 1.95
			} else if (totalWeight > 50 && totalWeight <= 100) {
				registroModicoValor = 2.5
			} else if (totalWeight > 100 && totalWeight <= 150) {
				registroModicoValor = 3.05
			} else if (totalWeight > 150 && totalWeight <= 200) {
				registroModicoValor = 3.65
			} else if (totalWeight > 200 && totalWeight <= 250) {
				registroModicoValor = 4.2
			} else if (totalWeight > 250 && totalWeight <= 300) {
				registroModicoValor = 4.75
			} else if (totalWeight > 300 && totalWeight <= 350) {
				registroModicoValor = 5.25
			} else if (totalWeight > 350 && totalWeight <= 400) {
				registroModicoValor = 5.9
			} else if (totalWeight > 400 && totalWeight <= 450) {
				registroModicoValor = 6.5
			} else if (totalWeight > 450 && totalWeight <= 500) {
				registroModicoValor = 7.1
			} else if (totalWeight > 500 && totalWeight <= 550) {
				registroModicoValor = 7.5
			} else if (totalWeight > 550 && totalWeight <= 600) {
				registroModicoValor = 8.1
			} else if (totalWeight > 600 && totalWeight <= 650) {
				registroModicoValor = 8.6
			} else if (totalWeight > 650 && totalWeight <= 700) {
				registroModicoValor = 9
			} else if (totalWeight > 700 && totalWeight <= 750) {
				registroModicoValor = 9.5
			} else if (totalWeight > 750 && totalWeight <= 800) {
				registroModicoValor = 9.95
			} else if (totalWeight > 800 && totalWeight <= 850) {
				registroModicoValor = 10.55
			} else if (totalWeight > 850 && totalWeight <= 900) {
				registroModicoValor = 11.15
			} else if (totalWeight > 900 && totalWeight <= 950) {
				registroModicoValor = 11.6
			} else if (totalWeight > 950 && totalWeight <= 1000) {
				registroModicoValor = 12.05
			} else if (totalWeight > 1000) {
				registroModicoValor = 16.90
			}
			rates["rates"].push({
				"description": "Registro módico",
				"cost": (registroModicoValor + registroModicoTaxa).toFixed(2)
			})
		}

		// If we have some rates, then we send them back to Snipcart:
		if (rates["rates"].length > 0) {
	    res.status(200).json(rates)
		// If not, then we send a error message:
		} else {
	    res.status(200).json({"errors": [{
			    "key": "invalid_postal_code",
			    "message": "Aparentemente, não há nenhum método de envio disponível para o seu endereço. Confirme, por gentileza, se você digitou seu CEP corretamente. Se o erro persistir, entre em contato conosco."
			    }]
			})
		}
		
  } else {
    res.status(200).json({message: 'There is nothing to do here.'})        
  }

}