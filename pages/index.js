import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {getBooks} from '../lib/books'
import ShowcaseBook from '../components/ShowcaseBook'
import ShowcaseOptions from '../components/ShowcaseOptions'
import ShowcaseFilters from '../components/ShowcaseFilters'
import ShowcasePagination from '../components/ShowcasePagination'
import styles from '../styles/Index.module.css'

export default function Index(props) {
	
	// States declaration:
	// - We use the State Hook (https://reactjs.org/docs/hooks-state.html) to add some local state to this function component. React will preserve this state between re-renders;
	// - useState returns a pair: the current state value and a function that lets you update it;
	// - After a state update, React will re-render the component, passing the new state value to it (and to any associated components that receive it as a prop);
	// - Array destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring
	// -> Horizontal filters state:
	const [filtersHorizontalActive, toggleFiltersHorizontalActive] = useState(false);

	// Function to handle the click on the filter options in the IndexOptions component:
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
					<ul>
	          {props.books.map(book => <ShowcaseBook book={book} key={book.id} />)}
	        </ul>
					<ShowcasePagination page={props.page}
															pagesTotal={props.pagesTotal} />
				</>
		)
	} else {
		showcase = <p>Ops! Não temos nenhum livro para lhe oferecer aqui.</p>
	}
				
  return (
			<div className="content" id={styles.index}>

	      <Head>
	        <title>Humana | Livros</title>
	      </Head>

				<ShowcaseOptions filtersHorizontalActive={filtersHorizontalActive} 
									       clickFiltersHorizontal={clickFiltersHorizontal} />
			
				<ShowcaseFilters filtersHorizontalActive={filtersHorizontalActive} />
				
	      <main id="showcase">
					{showcase}
				</main>
							
			</div>
  )
}

// This gets called on every request:
export async function getServerSideProps(context) {

	// The requested page (if none, then it's the first one):
	const page = (context.query.page) ? context.query.page : '1'
	
	// The max number of itens per page:
	// - Preferably a number divisible by all the possible number of columns in our layout (currently: 4).
	const totalItensPerPage = 16

	// Finally, we get the requested books and the number of pages needed to show them:
	const {books, pagesTotal} = await getBooks(page, totalItensPerPage)

  return {
    props: {books, pagesTotal, page, totalItensPerPage}
  }
}