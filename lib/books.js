import { readCMS } from './sanity'
import {bookPublicationYear,bookPrices,bookFormats,bookConditions,bookPriceRanges,bookCategories} from '../lib/utils'

// Library of functions for books:
// - Available books: with stock_situation "disponivel" or "esgotado_visivel").
// - !(_id in path("drafts.**")) excludes books that are still drafts in Sanity.

// Get the book categories:
export async function getBookCategories() {
	// Build the query to fetch the categories:
	const bookCategoriesQuery = '*[_type == "book_category"]{name,slug,"subcategories":*[_type == "book_subcategory" && references(^._id)]{name,slug}|order(name asc)}|order(name asc)' 
	// Fetch the categories and return them:
	const bookCategories = await readCMS.fetch(bookCategoriesQuery)
	return bookCategories
}

// Get the available books for the request and the number of pages needed to show them:
export async function getBooks(page, totalItensPerPage, formatsToFilterArray, conditionsToFilterArray, categoriesToFilterArray, subcategoriesToFilterArray,priceRangesToFilterArray,order, currentSearchString) {

	// Let's create a string with the filters to request to our CMS:
	// - We start the string with the type "book", the stock situation "available" and not drafts:
	var QueryFilters = '*[_type == "book" && !(_id in path("drafts.**")) && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")'
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
	// - Now we check if there are categories filters; if yes, we prepare the string:
	var categoryQueryFilters
	if (categoriesToFilterArray.length > 0) {
		const categoriesToFilterString = '["' + categoriesToFilterArray.join('","') + '"]'
		categoryQueryFilters = '(categories[]->slug)[@ in ' + categoriesToFilterString + ']'
	}
	// - Now we check if there are subcategories filters; if yes, we prepare the string:
	var subcategoryQueryFilters
	if (subcategoriesToFilterArray.length > 0) {
		const subcategoriesToFilterString = '["' + subcategoriesToFilterArray.join('","') + '"]'
		subcategoryQueryFilters = '(subcategories[]->slug)[@ in ' + subcategoriesToFilterString + ']'
	}
	// - Categories and subcategories  
	if ((categoryQueryFilters) && (subcategoryQueryFilters)) {
		QueryFilters = QueryFilters + ' && (' + categoryQueryFilters + ' || ' + subcategoryQueryFilters + ')'
	} else if (categoryQueryFilters) {
		QueryFilters = QueryFilters + ' && ' + categoryQueryFilters
	} else if (subcategoryQueryFilters) {
		QueryFilters = QueryFilters + ' && ' + subcategoryQueryFilters
	} 
	// - Now we check if there are a search string; if yes, then we create searches in the title and the authors:
	if (currentSearchString !== '') {
		QueryFilters = QueryFilters + ' && ((title match "' + currentSearchString + '") || (authors[]->name match "' + currentSearchString + '"))'
	}
	// - Now we check if there are price ranges filters; if yes, then we add them to the string:
	if (priceRangesToFilterArray.length > 0) {
		var priceRangeFilters = []
		if (priceRangesToFilterArray.indexOf(bookPriceRanges.priceRangeUpTo30Id) !== -1) {
			priceRangeFilters.push('(price <= 30)')
		}
		if (priceRangesToFilterArray.indexOf(bookPriceRanges.priceRangeUpTo60Id) !== -1) {
			priceRangeFilters.push('(price <= 60)')
		}
		if (priceRangesToFilterArray.indexOf(bookPriceRanges.priceRangeUpTo90Id) !== -1) {
			priceRangeFilters.push('(price <= 90)')
		}
		if (priceRangesToFilterArray.indexOf(bookPriceRanges.priceRangeUpTo150Id) !== -1) {
			priceRangeFilters.push('(price <= 150)')
		}
		const priceRangesToFilterString = '(' + priceRangeFilters.join(' || ') + ')'
		QueryFilters = QueryFilters + ' && ' + priceRangesToFilterString
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
		
		// Let's prepare the order clause:
		var orderClause
		if (order == bookPrices.priceAscId) {
			orderClause = 'price asc'
		} else if (order == bookPrices.priceDescId) {
			orderClause = 'price desc'
		} else if (order == bookPublicationYear.publicationYearAscId) {
			orderClause = 'publication_year asc'
		} else {
			orderClause = 'publication_year desc'
		}
		
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
								price_old,
                weight,
								format, 
								file_guid,
								width,
								length,
								height,
								special_category,
                "mainImageUrl": main_image.asset->url}
							 |order(${orderClause})
							 [${firstItem}..${lastItem}]`;
	
		// Fetch the books:
		const books = await readCMS.fetch(booksQuery)

  	return {books: books,
						pagesTotal: pagesTotal,
					  booksTotal: booksTotalCount}
	
	}
}

// Get the requested book:
export async function getABook(slug) {
	const singleBookQuery = `*[_type == "book" && slug == "${slug}" && !(_id in path("drafts.**")) && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")] {
	                            "id": _id, 
	                            title,
															slug,
															"stock_situation": stock_situation[0],
															"condition": condition[0],
															"authors": authors[]->{name},
															publishing_company->{name},
															"categories": categories[]->{name, slug},
															"subcategories": subcategories[]->{name, slug},
															publication_year,
															pages_number,
	                            description, 
	                            price,
															price_old, 
	                            weight,
															format,
															cover_type,
															file_guid,
															width,
															length,
															height,
															special_category,
	                            "mainImageUrl": main_image.asset->url
	                         }[0]`;
  const book = await readCMS.fetch(singleBookQuery)
	return book
}

// Get slugs of available books:
export async function getBooksSlugs() {
	const booksSlugsQuery = `*[_type == "book" && !(_id in path("drafts.**")) && (stock_situation[0] == "disponivel" || stock_situation[0] == "esgotado_visivel")]{slug}`
  const booksSlugs = await readCMS.fetch(booksSlugsQuery)
	return booksSlugs
}