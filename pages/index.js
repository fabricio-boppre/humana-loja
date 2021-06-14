import { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {getBooks} from '../lib/books'
import ShowcaseBook from '../components/ShowcaseBook'
import ShowcaseOptions from '../components/ShowcaseOptions'
import ShowcaseFilters from '../components/ShowcaseFilters'
import ShowcasePagination from '../components/ShowcasePagination'
import styles from '../styles/Index.module.css'

export default function Index(props) {

	// Constants:
	// - Book formats and books conditions don't change, so we can manually organize it.
	const bookFormats = {
		id: 'format', 
		title: 'formato',
		formatLivroId: 'livro',
		formatLivroTitle: 'livro',
		formatEbookId: 'ebook',
		formatEbookTitle: 'ebook'
	}
	const bookConditions = {
		id: 'condition',
		title: 'estado',
		conditionNovoId: 'novo', 
		conditionNovoTitle: 'novo',
		conditionUsadoId: 'usado', 
		conditionUsadoTitle: 'usado'
	}
	
	// Router:
	// - Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory it's automatically available as a route. To access the router object we use the useRouter:
	// - More information: https://nextjs.org/docs/routing/introduction
	const router = useRouter()
	
	// States:
	// - We use the State Hook (https://reactjs.org/docs/hooks-state.html) to add some local state to this function component. React will preserve this state between re-renders;
	// - useState returns a pair: the current state value and a function that lets you update it;
	// - After a state update, React will re-render the component, passing the new state value to it (and to any associated components that receive it as a prop);
	// - Array destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring
	// - Horizontal layout filters state:
	const [filtersHorizontalActive, toggleFiltersHorizontalActive] = useState(false);
	// - Formats to filter state:
	const [formatsToFilter, setFormatToFilter] = useState(props.formatsToFilterArray);
	// - Conditions to filter state:
	const [conditionsToFilter, setConditionToFilter] = useState(props.conditionsToFilterArray);
	// - Page state:
	const [page, setPage] = useState(props.page);
	// - This state is just to help us re-render the component after removing filters (see explanation below in clickFilter function):
	const [removedFilter, forceUpdate] = useReducer(x => x + 1, 0);
	
	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component;
	useEffect(() => {
		// After updating the filters or page states, we have to re-route the app:
		// - To have the useEffect hook called only when state updates, we include the relevant states in the dependency array (the second argument passed to useEffect).
		// - First, we prepare the query string based on our current state:  
		var formatsQueryString = ''
		var conditionsQueryString = ''
		var pageQueryString = ''
		if (formatsToFilter.length > 0) {
			formatsQueryString = '?format=' + formatsToFilter.join(',')	
		}
		if (conditionsToFilter.length > 0) {
			conditionsQueryString = ((formatsQueryString !== '') ? "&" : "?") + 'condition=' + conditionsToFilter.join(',')		
		}
		if (page > 1) {
			pageQueryString = (((formatsQueryString !== '') || (conditionsQueryString !== '')) ? "&" : "?") + 'page=' + page		
		}
		// - Then, we proceed the client-side transition:
		if ((formatsQueryString + conditionsQueryString + pageQueryString) == '') {
			router.push('/')	
		} else {
			router.push(formatsQueryString + conditionsQueryString + pageQueryString)
    }
	}, [page
		 ,formatsToFilter
		 ,conditionsToFilter
		 ,removedFilter])
  useEffect(() => {
		// Visual effect on the showcase while its being loaded:
		// - We listen to different events happening inside the Next.js Router to make changes on the styles;
		// - More info: https://nextjs.org/docs/api-reference/next/router#routerevents.
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
	// - After updating the state, the component is immediately re-rendered (the re-route happens in the Effect Hook).
	const clickNextPage = () => {
		setPage(parseInt(page)+1)
	}
	const clickPreviousPage = () => {
		setPage(parseInt(page)-1)
	}

	// Function that check if there is at least one of a specific filter type active:
	const isFilterTypeActive = (filterType) => {
		var filterArray
		if (filterType == 'format') {
		 	filterArray = formatsToFilter
		} else if (filterType == 'condition') {	
		 	filterArray = conditionsToFilter
		}	
		if (filterArray.length > 0) {
			return true
		}
		return false
	}
	
	// Function that check if a specific filter is active:
	const isFilterActive = (filter, filterType) => {
		// First we copy the current state (of the requested type) into an array:
	  var filterArray
		if (filterType == 'format') {
		 	filterArray = formatsToFilter
		} else if (filterType == 'condition') {	
		 	filterArray = conditionsToFilter
		}	
		// Now we check if the format is in the list:
		var index = filterArray.indexOf(filter)
		if (index !== -1) {
			return true
		} else {
			return false
		}
	}

	// Function to handle the click on the title of a filters list:
	// - It should cancel the active filters of this type, cleaning the correspondent state:
	const clickFilterType = (filterType) => {
		// We check which is the type of filter and then clean its state:
		if (filterType == 'format') {
			setFormatToFilter([])
		} else if (filterType == 'condition') {	
		 	setConditionToFilter([])
		}	
		// We also set the page to the first one, because changing the filters must renew the showcase:
		setPage(1)
	}
	
	// Function to handle the click on an option of the filters lists:
	// - The click calls the function that updates the filter state, activating or deactivating the clicked option.
	const clickFilter = (clickedFilter, filterType) => {
		// First we copy the current state (of the requested type) into an array:
	  var filterArray
		if (filterType == bookFormats.id) {
		 	filterArray = formatsToFilter
		} else if (filterType == bookConditions.id) {	
		 	filterArray = conditionsToFilter
		}	
		// Now we check if the clicked format is in the list:
		var index = filterArray.indexOf(clickedFilter)
	  // If not, then we add it to the state (of the requested type) with the previous formats:
		// - After updating the state, the component is immediately re-rendered (the re-route happens in the Effect Hook).
		if (index == -1) {
			if (filterType == bookFormats.id) {
			 	setFormatToFilter([...formatsToFilter, clickedFilter])
			} else if (filterType == bookConditions.id) {	
			 	setConditionToFilter([...conditionsToFilter, clickedFilter])
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
			}
			forceUpdate() 
		}
		// Finally, we set the page to the first one, because changing the filters must renew the showcase:
		setPage(1)
  }

	// Function to handle the click on the "show filters" option in the ShowcaseOptions component:
	// - Responsiveness rules determines whether these options are visible or not; 
	// - The click calls the function that updates the filtersHorizontalActive state (in this case, it means inverting its value) and re-render the component.
	const clickFiltersHorizontal = () => {
    toggleFiltersHorizontalActive(!filtersHorizontalActive);
  }
	
	// Create the showcase with the books and the pagination component, or an error message in case of no books:
	var showcase
	if (props.books) {
		showcase = (
	      <>
					<ul id="showcase-books-list">
	          {props.books.map(book => <ShowcaseBook book={book} key={book.id} />)}
	        </ul>
					<ShowcasePagination page={props.page}
															pagesTotal={props.pagesTotal}
															booksTotal={props.booksTotal}
															clickPreviousPage={clickPreviousPage}
															clickNextPage={clickNextPage} />
				</>
		)
	} else {
		showcase = <p id="empty-showcase">Ops! Não temos nenhum livro para lhe oferecer neste momento.</p>
	}
				
  return (
			<div className="content" id={styles.index}>

	      <Head>
	        <title>Humana | Livros</title>
	      </Head>

				<ShowcaseOptions filtersHorizontalActive={filtersHorizontalActive} 
									       clickFiltersHorizontal={clickFiltersHorizontal} />
			
				<ShowcaseFilters filtersHorizontalActive={filtersHorizontalActive}
												 clickFilterType={clickFilterType}
												 clickFilter={clickFilter}
												 isFilterActive={isFilterActive}
												 isFilterTypeActive={isFilterTypeActive}
												 bookConditions={bookConditions}
												 bookFormats={bookFormats} />
				
	      <main id="showcase">
					{showcase}
				</main>
							
			</div>
  )
}

// This gets called on every request, to provide the data:
export async function getServerSideProps(context) {

	// The requested page (if none, then it's the first one):
	const page = (context.query.page) ? context.query.page : 1
	
	// The requested formats:
	var formatsToFilterArray = []
	if (context.query.format) {
		const formatsToFilterQueryString = (context.query.format)
		formatsToFilterArray = formatsToFilterQueryString.split(",")
	}

	// The requested conditions:
	var conditionsToFilterArray = []
	if (context.query.condition) {
		const conditionsToFilterQueryString = (context.query.condition)
		conditionsToFilterArray = conditionsToFilterQueryString.split(",")
	}
	
	// The max number of itens per page:
	// - Preferably a number divisible by all the possible number of columns in our layout (currently: 4).
	const totalItensPerPage = 24

	// Finally, we get the requested books and the number of pages needed to show them:
	const {books, pagesTotal, booksTotal} = await getBooks(page, totalItensPerPage, formatsToFilterArray, conditionsToFilterArray)

  return {
    props: {books, pagesTotal, booksTotal, page, totalItensPerPage, formatsToFilterArray, conditionsToFilterArray}
  }
}