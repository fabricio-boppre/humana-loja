import { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { bookPublicationYear,bookPrices,bookFormats,bookConditions,bookPriceRanges,bookCategories,bookSubcategories } from '../lib/utils'
import { getBooks,getBookCategories } from '../lib/books'
import ShowcaseBook from '../components/ShowcaseBook'
import ShowcaseFiltersAndOrder from '../components/ShowcaseFiltersAndOrder'
import ShowcasePagination from '../components/ShowcasePagination'
import styles from '../styles/Index.module.css'
	
export default function Index(props) {

	// Let's add to our bookCategories constant the fetched categories:
	bookCategories.categories = props.bookCategories
	
	// Router:
	// - Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory it's automatically available as a route. To access the router object we use the useRouter:
	// - More information: https://nextjs.org/docs/routing/introduction
	const router = useRouter()
	
	// - This ref object is just to help us avoid a new automatic render after the first one:
	// - useRef Hook: https://reactjs.org/docs/hooks-reference.html#useref;
	// - See logic explanation below in the routing useEffect:
	const didMountRef = useRef(false)

	// States:
	// - We use the State Hook (https://reactjs.org/docs/hooks-state.html) to add some local state to this function component. React will preserve this state between re-renders;
	// - useState returns a pair: the current state value and a function that lets you update it;
	// - After a state update, React will re-render the component, passing the new state value to it (and to any associated components that receive it as a prop);
	// - Array destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring
	// - Formats to filter state:
	const [formatsToFilter, setFormatToFilter] = useState(props.formatsToFilterArray)
	// - Conditions to filter state:
	const [conditionsToFilter, setConditionToFilter] = useState(props.conditionsToFilterArray)
	// - Categories to filter state:
	const [categoriesToFilter, setCategoryToFilter] = useState(props.categoriesToFilterArray)
	// - Subcategories to filter state:
	const [subcategoriesToFilter, setSubcategoryToFilter] = useState(props.subcategoriesToFilterArray)
	// - Price ranges to filter state:
	const [priceRangesToFilter, setPriceRangeToFilter] = useState(props.priceRangesToFilterArray)
	// - Order state:
	const [order, setOrder] = useState(props.order)
	// - Page states:
	const [page, setPage] = useState(props.page)
	const [changingPage, setChangingPage] = useState(false)
	// - This state is just to help us re-render the component after removing filters (see explanation below in clickFilter function):
	const [removedFilter, forceUpdate] = useReducer(x => x + 1, 0)
	// - Search string state:
	const [currentSearchString,setCurrentSearchString] = useState(props.currentSearchString)
	
	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component.
	// - To have the useEffect hook called only when certain states or props are updated, we include them in the dependency array (the second argument passed to useEffect).
	// - If we have a currentSearchString but the formSearchString is empty, we set the form with it, it means the user is opening the website with a search query string already in its URI (instead of submitting it via search form);
	// - Our index will take care of fetching the data for the search, but we have to manually put this string in the form search after the first render, for layout consistency. We do this by calling a method that updates the formSearchString state with the currentSearchString:
	useEffect(() => {
		if (props.formSearchString !== props.currentSearchString) {
			props.setFormSearchStringWithValue(props.currentSearchString)
		}
	}, [])
	// - If we have a new search (the search button increments our searchCount prop), we have to clear the page state, filters states and order states and set formSearchString as the new currentSearchString state;
	// - But we only clean these states if in fact they have values; this check also helps to avoid useless re-renders if the search comes from another page than the index:
	useEffect(() => {
		if (props.searchCount > 0) {
			setCurrentSearchString(props.formSearchString)
			if (props.formatsToFilterArray.length > 0) { setFormatToFilter([]) }
			if (props.conditionsToFilterArray.length > 0) { setConditionToFilter([]) }
			if (props.categoriesToFilterArray.length > 0) { setCategoryToFilter([]) }
			if (props.subcategoriesToFilterArray.length > 0) { setSubcategoryToFilter([]) }
			if (props.priceRangesToFilterArray.length > 0) { setPriceRangeToFilter([]) }
			if (props.order !== bookPublicationYear.publicationYearDescId) { setOrder(bookPublicationYear.publicationYearDescId) }
			if (props.page !== 1) { setPage(1) }
		}
	}, [props.searchCount])
	// - This effect checks if there are inconsistencies between the props and the states from where they were originated;
	// - If there are, it probably means the user is navigating through the browser's history, going from instance of the index direct to another; the inconsistencies can happen because, when navigating to the same page in Next.js, the page's state will not be reset by default, as the top-level React component is the same (while the props change because they come from the router query);
	// - When we find an inconsistency, we update the state with the value found on the router query; this forces a re-render, which then forces  a re-route (in the effect below): 
	useEffect(() => {
		if ((JSON.stringify(categoriesToFilter) !== JSON.stringify(props.categoriesToFilterArray)) ||
			  (JSON.stringify(subcategoriesToFilter) !== JSON.stringify(props.subcategoriesToFilterArray)) ||
				(JSON.stringify(formatsToFilter) !== JSON.stringify(props.formatsToFilterArray)) ||
				(JSON.stringify(conditionsToFilter) !== JSON.stringify(props.conditionsToFilterArray)) ||
				(JSON.stringify(priceRangesToFilter) !== JSON.stringify(props.priceRangesToFilterArray)) ||
				(order !== props.order) ||
				(page !== props.page) ||
				(currentSearchString !== props.currentSearchString)) {
			router.query.category ? setCategoryToFilter(router.query.category.split(",")) : setCategoryToFilter([])
			router.query.subcategory ? setSubcategoryToFilter(router.query.subcategory.split(",")) : setSubcategoryToFilter([])
			router.query.format ? setFormatToFilter(router.query.format.split(",")) : setFormatToFilter([])
			router.query.condition ? setConditionToFilter(router.query.condition.split(",")) : setConditionToFilter([])
			router.query.priceRange ? setPriceRangeToFilter(router.query.priceRange.split(",")) : setPriceRangeToFilter([])
			router.query.order ? setOrder(router.query.order) : setOrder(bookPublicationYear.publicationYearDescId)
			router.query.page ? setPage(parseInt(router.query.page)) : setPage(1)
			if (router.query.search) {
				setCurrentSearchString(router.query.search)
				props.setFormSearchStringWithValue(router.query.search)
			} else {
				setCurrentSearchString('')
				props.setFormSearchStringWithValue('')
			}
		}
	},[props.categoriesToFilterArray
		,props.subcategoriesToFilterArray
		,props.formatsToFilterArray
		,props.conditionsToFilterArray
		,props.priceRangesToFilterArray
		,props.order
		,props.page
	  ,props.currentSearchString])
	// - After updating the filters or order or page states, we have to re-route the app:
	useEffect(() => {
		// There are two conditions for this re-route to happen:
		// - didMountRef must be true: it means we are not in the first rendering of the page and we indeed need to make the requested re-route;
		// - homeClicked must be false: if is is true, it means the user clicked on the logo, which will already to a re-route because it is a Link component, and then we avoid a useless second re-route. 
		if ((didMountRef.current) && (!props.homeClicked)) {
			// First, we prepare the query strings based on our current states:
			var formatsQueryString = ''
			var conditionsQueryString = ''
			var categoriesQueryString = ''
			var subcategoriesQueryString = ''
			var priceRangesQueryString = ''
			var orderQueryString = ''
			var searchQueryString = ''
			var pageQueryString = ''
			var isFirstQuery = true
			if (formatsToFilter.length > 0) {
				formatsQueryString = '?' + bookFormats.id + '=' + formatsToFilter.join(',')
				isFirstQuery = false
			}
			if (conditionsToFilter.length > 0) {
				conditionsQueryString = (isFirstQuery ? "?" : "&") + bookConditions.id + '=' + conditionsToFilter.join(',')		
				isFirstQuery = false
			}
			if (categoriesToFilter.length > 0) {
				categoriesQueryString = (isFirstQuery ? "?" : "&") + bookCategories.id + '=' + categoriesToFilter.join(',')		
				isFirstQuery = false
			}
			if (subcategoriesToFilter.length > 0) {
				subcategoriesQueryString = (isFirstQuery ? "?" : "&") + bookSubcategories.id + '=' + subcategoriesToFilter.join(',')		
				isFirstQuery = false
			}
			if (priceRangesToFilter.length > 0) {
				priceRangesQueryString = (isFirstQuery ? "?" : "&") + bookPriceRanges.id + '=' + priceRangesToFilter.join(',')		
				isFirstQuery = false
			}
			if (order !== bookPublicationYear.publicationYearDescId) {
				orderQueryString = (isFirstQuery ? "?" : "&") + 'order=' + order		
				isFirstQuery = false
			}
			if (currentSearchString !== '') {
				searchQueryString = (isFirstQuery ? "?" : "&") + 'search=' + currentSearchString
				isFirstQuery = false
			}
			if (page > 1) {
				pageQueryString = (isFirstQuery ? "?" : "&") + 'page=' + page		
			}
			// If we are dealing with a page changing, then we need to scroll the page to the top:
			var scroll = false				
			if (changingPage) {
				scroll = true
				setChangingPage(false)
			}
			// Then we proceed the client-side transition with the requested queries:
			// - We use replace to prevent adding a new URL entry into the history stack;
			// - More info: https://nextjs.org/docs/api-reference/next/router#routerreplace
			router.replace('/' + formatsQueryString + conditionsQueryString + categoriesQueryString + subcategoriesQueryString + priceRangesQueryString + orderQueryString + searchQueryString + pageQueryString, null, {scroll: scroll})
		// If any of the conditions fail, it means we are in the first rendering of the page or the visitor clicked on the logo and we are back to the home, and we don't need to make any re-route (we only need to update the ref, so the next time the re-route will happen, and to finish the process of coming back to home):
		} else {
	    didMountRef.current = true
			props.finishHomeClicked()
		}
	}, [page
		 ,order
		 ,formatsToFilter
		 ,conditionsToFilter
		 ,categoriesToFilter
		 ,subcategoriesToFilter
		 ,priceRangesToFilter
		 ,removedFilter])

	// - Visual effect on the showcase while route is on its way:
	// - We listen to different events happening inside the Next.js Router to make changes on the styles;
	// - More info: https://nextjs.org/docs/api-reference/next/router#routerevents
  useEffect(() => {
		const mainShowcase = document.getElementById("showcase")
    const handleRouteChangeStart = (url, { shallow }) => {
			mainShowcase.classList.add("loading")
    }
    const handleRouteChangeComplete = (url, { shallow }) => {
			mainShowcase.classList.remove("loading")
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // - If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

	// Functions to handle the clicks on pagination:
	// - The click calls the function that updates the page state;
	// - We set the changingPage state just to help us with a layout issue in the routing;
	// - After updating the state, the component is immediately re-rendered (the re-route happens in the Effect Hook).
	const clickNextPage = () => {
		setPage(parseInt(page)+1)
		setChangingPage(true)
	}
	const clickPreviousPage = () => {
		setPage(parseInt(page)-1)
		setChangingPage(true)
	}

	// Function that check if there is at least one of a specific filter type active or (when dealing with categories) partial:
	const isFilterTypeActive = (filterType) => {
		var filterArray
		if (filterType == bookFormats.id) {
		 	filterArray = formatsToFilter
		} else if (filterType == bookConditions.id) {	
		 	filterArray = conditionsToFilter
		} else if (filterType == bookCategories.id) {	
			// In the case of categories, we must check if there are any subcategoriesToFilter; if so, then the filter type Category is active:
			if (subcategoriesToFilter.length > 0) {
				return true
			}
		 	filterArray = categoriesToFilter
		} else if (filterType == bookPriceRanges.id) {	
		 	filterArray = priceRangesToFilter
		}	
		if (filterArray.length > 0) {
			return true
		}
		return false
	}

	// Function that check if a specific filter is active or (when dealing with categories) partial:
	const isFilterActiveOrPartial = (filter, filterType) => {
		// If we are dealing with categories, then we have to check if the category has sub-categories and if at least one of them is active as a subcategoriesToFilter:
		if (filterType == bookCategories.id) {
			var category = props.bookCategories.find(cat => cat.slug === filter)
			if (category.subcategories.length > 0) {
				var subcategories = category.subcategories
				var hasSubCatActive = false
				subcategories.map(subcat => {
					if (subcategoriesToFilter.includes(subcat.slug)) {
						hasSubCatActive = true
					}
				})
				// - If there's at least one sub-category active as a subcategoriesToFilter, the filter is "partial":
				if (hasSubCatActive) {
					return "partial"
				}
			}
		}
		// If the filter is not "partial", we proceed: let's copy the current state (of the requested type) into an array:
	  var filterArray
		if (filterType == bookFormats.id) {
		 	filterArray = formatsToFilter
		} else if (filterType == bookConditions.id) {	
		 	filterArray = conditionsToFilter
		} else if (filterType == bookCategories.id) {	
		 	filterArray = categoriesToFilter
		} else if (filterType == bookSubcategories.id) {	
		 	filterArray = subcategoriesToFilter
		} else if (filterType == bookPriceRanges.id) {	
		 	filterArray = priceRangesToFilter
		}	
		// Now we check if the format is in the list; if it is, the filter is "active":
		var index = filterArray.indexOf(filter)
		if (index !== -1) {
			return "active"
		}
		// If it's not "partial" nor "active":
		return ""
	}

	// Function to handle the click on the title of a filters list:
	// - It should cancel all the active filters (and sub-filters) of this type, cleaning the correspondent state:
	const clickFilterType = (filterType) => {
		// We check which is the type of filter and then clean its state:
		if (filterType == bookFormats.id) {
			setFormatToFilter([])
		} else if (filterType == bookConditions.id) {	
		 	setConditionToFilter([])
		} else if (filterType == bookCategories.id) {	
		 	setCategoryToFilter([])
			// If we are dealing with categories, we also need to remove all its subcategories filters:
			setSubcategoryToFilter([])
		} else if (filterType == bookPriceRanges.id) {	
		 	setPriceRangeToFilter([])
		}	
		// We also set the page to the first one, because changing the filters must renew the showcase:
		setPage(1)
	}
	
	// Function to handle the click on an option of the filters lists:
	// - The click calls the function that updates the filter state, activating or deactivating the clicked option.
	const clickFilter = (clickedFilter, filterType, maxOne, filterToRemove, filterToRemoveType) => {
		// First we copy the current state (of the requested type) into an array:
	  var filterArray
		if (filterType == bookFormats.id) {
		 	filterArray = formatsToFilter
		} else if (filterType == bookConditions.id) {	
		 	filterArray = conditionsToFilter
		} else if (filterType == bookCategories.id) {	
		 	filterArray = categoriesToFilter
		} else if (filterType == bookSubcategories.id) {	
		 	filterArray = subcategoriesToFilter
		} else if (filterType == bookPriceRanges.id) {	
		 	filterArray = priceRangesToFilter
		}	
		// Now we check if the clicked option is in the list:
		var index = filterArray.indexOf(clickedFilter)
	  // If not, then we add it to the state (of the requested type):
		// - If maxOne is true, then the clickedFilter must be activated and the the previous ones discarded;
		// - If maxOne is false, then the clickedFilter must be added to the previous options;
		// - After updating the state, the component is immediately re-rendered (the re-route happens in the Effect Hook).
		if (index == -1) {
			if (filterType == bookFormats.id) {
			 	maxOne ? setFormatToFilter([clickedFilter]) : setFormatToFilter([...formatsToFilter, clickedFilter])
			} else if (filterType == bookConditions.id) {	
			 	maxOne ? setConditionToFilter([clickedFilter]) : setConditionToFilter([...conditionsToFilter, clickedFilter])
			} else if (filterType == bookCategories.id) {	
			 	maxOne ? setCategoryToFilter([clickedFilter]) : setCategoryToFilter([...categoriesToFilter, clickedFilter])
				// If we are dealing with categories, we also need to remove from subcategoriesToFilter the subcategories of the category being added:
				var category = props.bookCategories.find(cat => cat.slug === clickedFilter)
				if (category.subcategories.length > 0) {
					var subcategories = category.subcategories
					var subFilterArray = subcategoriesToFilter
					subcategories.map(subcat => {
						if (subcategoriesToFilter.includes(subcat.slug)) {
							subFilterArray = subFilterArray.filter(item => item !== subcat.slug)
						}
					})
					setSubcategoryToFilter(subFilterArray)
				}
			} else if (filterType == bookSubcategories.id) {	
			 	maxOne ? setSubcategoryToFilter([clickedFilter]) : setSubcategoryToFilter([...subcategoriesToFilter, clickedFilter])
			} else if (filterType == bookPriceRanges.id) {	
			 	maxOne ? setPriceRangeToFilter([clickedFilter]) : setPriceRangeToFilter([...priceRangesToFilter, clickedFilter])
			}	
		// If it is, then we remove it from the array and update the state (of the requested type) with this new array:
		// - After updating the state, we need to force a re-render because in some situations removing an item from a state doesn't trigger the re-ender immediately:
		// - See: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate);
		// - The trick: forceUpdate updates a state called removedFilter and this forces the re-render (the re-route happens in the Effect Hook, which is called because we put removedFilter in the dependency array of useEffect).
		} else {
			filterArray.splice(index, 1)
			if (filterType == bookFormats.id) {
				setFormatToFilter(filterArray)
			} else if (filterType == bookConditions.id) {	
			 	setConditionToFilter(filterArray)
			} else if (filterType == bookCategories.id) {	
			 	setCategoryToFilter(filterArray)
			} else if (filterType == bookSubcategories.id) {	
			 	setSubcategoryToFilter(filterArray)
			} else if (filterType == bookPriceRanges.id) {	
			 	setPriceRangeToFilter(filterArray)
			}
			forceUpdate() 
		}
		// If we have a filterToRemove, it means that the activation of the clickedFilter must automatically deactivate the filterToRemove (probably because filterToRemove is the parent of the clickedFilter):
		if (filterToRemove) {
	 		filterArray = categoriesToFilter
			var index = filterArray.indexOf(filterToRemove)
			if (index !== -1) {
				filterArray.splice(index, 1)
		 	 	setCategoryToFilter(filterArray)
				forceUpdate()
			}
		}
		// Finally, we set the page to the first one, because changing the filters must renew the showcase:
		setPage(1)
  }

	// Function that check if a specific order is active:
	const isOrderActive = (orderToCheck) => {
		if (orderToCheck === order) {
			return true
		}
		return false
	}

	// Function to handle the click on an option of the order lists:
	// - The click calls the function that updates the order state, setting the clicked option.
	const clickOrder = (clickedOrder) => {
	 	setOrder(clickedOrder)
		// We also set the page to the first one, because changing the order must renew the showcase:
		setPage(1)
  }

	// Sum the total number of active filters to show in the ShowcaseFiltersAndOrder component:
	const filterCount = parseInt(props.categoriesToFilterArray.length) + parseInt(props.subcategoriesToFilterArray.length) + parseInt(props.formatsToFilterArray.length) + parseInt(props.conditionsToFilterArray.length) + parseInt(props.priceRangesToFilterArray.length)
	
	// Create the showcase with the books and the pagination component, or an error message in case of no books:
	var showcase
	var showcaseTitle
	var HeadTitle
	if (currentSearchString) {
		showcaseTitle = <h1>Resultado da pesquisa pelo termo <strong>{currentSearchString}</strong>:</h1>
		HeadTitle = <title>Humana | Livros com &#34;{currentSearchString}&#34;</title>
	} else {
		HeadTitle = <title>Humana | Livros</title>
	}
	if (props.books) {
		showcase = (
	      <>
					<ul id="showcase-books-list">
	          {props.books.map(book => <ShowcaseBook book={book} 
																									 key={book.id} />)}
	        </ul>
					<ShowcasePagination page={props.page}
															pagesTotal={props.pagesTotal}
															booksTotal={props.booksTotal}
															clickPreviousPage={clickPreviousPage}
															clickNextPage={clickNextPage} />
				</>
		)
	} else {
		showcase = <p id="empty-showcase">Infelizmente, não temos o que você procura no momento. Convidamos você a entrar em contato conosco para avaliarmos a encomenda do que você deseja. Fone/WhatsApp: 49 3316-4566 / Instagram: <a href="https://www.instagram.com/humanasebolivraria/">@humanasebolivraria</a> / E-mail: <a href="mailto:humanasebolivraria@gmail.com">humanasebolivraria@gmail.com</a>.</p>
	}
	
  return (
		<>
      <Head>
        {HeadTitle}
				<meta name="description" content="Loja virtual da Humana Sebo e Livraria. Enviamos para todo o Brasil." />
				<meta name="Algolia crawler" content="noindex" />
				<link rel="preload" href="/img/layout/filter-button-clean.svg" as="image" />
				<link rel="preload" href="/img/layout/checkbox-unchecked.svg" as="image" />
				<link rel="preload" href="/img/layout/checkbox-checked.svg" as="image" />
				<link rel="preload" href="/img/layout/checkbox-partial.svg" as="image" />
      </Head>

			<div className="content" id={styles.index}>
			
				<ShowcaseFiltersAndOrder clickFilterType={clickFilterType}
												 				 clickFilter={clickFilter}
																 clickOrder={clickOrder}
																 isFilterActiveOrPartial={isFilterActiveOrPartial}
												 				 isFilterTypeActive={isFilterTypeActive}
																 isOrderActive={isOrderActive}
												 				 bookConditions={bookConditions}
												 				 bookFormats={bookFormats}
												 				 bookCategories={bookCategories} 
																 bookSubcategories={bookSubcategories} 
																 bookPriceRanges={bookPriceRanges}
																 bookPublicationYear={bookPublicationYear}
																 bookPrices={bookPrices}
																 filterCount={filterCount} />
				
	      <main id="showcase">
					{showcaseTitle ? showcaseTitle : ''}
					{showcase}
				</main>
							
			</div>
		</>
  )
}

// This gets called on every request, to provide the data:
export async function getServerSideProps(context) {

	// The requested search string (if none, then it's empty):
	var currentSearchString = (context.query.search) ? context.query.search : ''

	// The requested page (if none, then it's the first one):
	var page = (context.query.page) ? parseInt(context.query.page) : 1

	// The order (if none or impossible value, then it's the publication year [desc]):
	var orderPossibleValues = [bookPublicationYear.publicationYearDescId,
														 bookPublicationYear.publicationYearAscId,
														 bookPrices.priceAscId,
														 bookPrices.priceDescId]
	var order = (context.query.order) ? 
									(orderPossibleValues.indexOf(context.query.order) > -1 ? 
										context.query.order
										: bookPublicationYear.publicationYearDescId)
									: bookPublicationYear.publicationYearDescId

	// The requested formats (filtering just possible values):
	var formatsToFilterArray = []
	var formatPossibleValues = [bookFormats.formatEbookId,
														  bookFormats.formatLivroId]
	if (context.query.format) {
		const formatsToFilterQueryString = (context.query.format)
		formatsToFilterArray = formatsToFilterQueryString.split(",")
		formatsToFilterArray = formatsToFilterArray.filter(format => formatPossibleValues.indexOf(format) > -1)
	}

	// The requested conditions (filtering just possible values):
	var conditionsToFilterArray = []
	var conditionPossibleValues = [bookConditions.conditionNovoId,
																 bookConditions.conditionUsadoId]
	if (context.query.condition) {
		const conditionsToFilterQueryString = (context.query.condition)
		conditionsToFilterArray = conditionsToFilterQueryString.split(",")
		conditionsToFilterArray = conditionsToFilterArray.filter(condition => conditionPossibleValues.indexOf(condition) > -1)
	}

	// The requested categories:
	var categoriesToFilterArray = []
	if (context.query.category) {
		const categoriesToFilterQueryString = (context.query.category)
		categoriesToFilterArray = categoriesToFilterQueryString.split(",")
	}

	// The requested subcategories:
	var subcategoriesToFilterArray = []
	if (context.query.subcategory) {
		const subcategoriesToFilterQueryString = (context.query.subcategory)
		subcategoriesToFilterArray = subcategoriesToFilterQueryString.split(",")
	}

	// The requested price ranges (filtering just possible values):
	var priceRangesToFilterArray = []
	var priceRangePossibleValues = [bookPriceRanges.priceRangeUpTo60Id,
																  bookPriceRanges.priceRangeUpTo30Id,
																	bookPriceRanges.priceRangeUpTo150Id,
																	bookPriceRanges.priceRangeUpTo90Id]
	if (context.query.priceRange) {
		const priceRangesToFilterQueryString = (context.query.priceRange)
		priceRangesToFilterArray = priceRangesToFilterQueryString.split(",")
		priceRangesToFilterArray = priceRangesToFilterArray.filter(range => priceRangePossibleValues.indexOf(range) > -1)
	}
	
	// The max number of itens per page:
	// - Preferably a number divisible by all the possible number of columns in our layout (currently: 4).
	const totalItensPerPage = 36

	// Let's get the book categories to build the filter list:
	const bookCategories = await getBookCategories()

	// Finally, we get the requested books and the number of pages needed to show them:
	const {books, pagesTotal, booksTotal} = await getBooks(page, totalItensPerPage, formatsToFilterArray, conditionsToFilterArray, categoriesToFilterArray, subcategoriesToFilterArray, priceRangesToFilterArray, order, currentSearchString)

  return {
    props: {
			books,
			bookCategories,
			pagesTotal,
			booksTotal,
			page,
			totalItensPerPage,
			formatsToFilterArray,
			conditionsToFilterArray,
			categoriesToFilterArray,
			subcategoriesToFilterArray,
			priceRangesToFilterArray,
			order,
			currentSearchString,
		}
  }
}