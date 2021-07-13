import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './SearchForm.module.css'

export default function SearchForm(props) {

	// Router:
	// - See the explanation of why we use Effect Hook in the index.js page.
  const router = useRouter()
	
	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component.
	// - If the URI has a search query string but our searchCount is still 0, it means the user is opening the website with a search query string already in its URI (instead of submitting it via search form);
	// - Our index will take care of fetching the data for the search, but we have to manually put this string in the form search after the first render, for layout consistency. We do this by calling a method that updates the formSearchString state with the query string:
	useEffect(() => {
		if ((router.query.search) && (props.searchCount == 0)) {
			props.setFormSearchStringWithValue(router.query.search)
		}
	}, [])
	
  return (
		<div id={styles.search_form}>
			<form>
				<input type="search" placeholder="título ou autor" value={props.formSearchString} onChange={props.setFormSearchString}/>
    		<Link href={`/?search=${encodeURIComponent(props.formSearchString)}`} >
					<button onClick={() => props.handleSearchButton()}>pesquisar</button>
				</Link>
			</form>
     </div>
	)
}
