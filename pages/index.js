import { useState } from 'react'
import { readCMS } from '../lib/sanity'
import Head from 'next/head'
import Link from 'next/link'
import IndexBook from '../components/IndexBook.js'
import IndexOptions from '../components/IndexOptions.js'
import IndexFilters from '../components/IndexFilters.js'
import styles from '../styles/Index.module.css'

export default function Index({books}) {
	
	// States declaration:
	// - We use the State Hook (https://reactjs.org/docs/hooks-state.html) to add some local state to this function component. React will preserve this state between re-renders;
	// - useState returns a pair: the current state value and a function that lets you update it;
	// - After a state update, React will re-render the component, passing the new state value to it (and to any associated components that receive it as a prop);
	// - Array destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring
	const [filtersHorizontalActive, toggleFiltersHorizontalActive] = useState(false);
  
	// Function to handle the click on the filter options in the IndexOptions component:
	// - Responsiveness rules determines whether these options are visible or not; 
	// - The click calls the function that updates the filtersHorizontalActive state (in this case, it means inverting its value) and re-render the component.
	const clickFiltersHorizontal = () => {
    toggleFiltersHorizontalActive(!filtersHorizontalActive);
  }
			
  return (
			<div className="content" id={styles.index}>

	      <Head>
	        <title>Humana | Livros</title>
	      </Head>

				<IndexOptions filtersHorizontalActive={filtersHorizontalActive} 
										  clickFiltersHorizontal={clickFiltersHorizontal} />
				
				<IndexFilters filtersHorizontalActive={filtersHorizontalActive} />
				
	      <main id="index">
					<ul>
	          {books.map(book => <IndexBook book={book} key={book.id} />)}
	        </ul>
				</main>
			
			</div>
  )
}

// This function gets called at build time on server-side and also after requests:
export async function getStaticProps() {
	const booksQuery = `*[_type == "book" &&
											  (stock_situation[0] == "disponivel" ||
											   stock_situation[0] == "esgotado_visivel")
											 ]{
	                      "id": _id, 
	                      title,
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
	                      "mainImageUrl": main_image.asset->url
	                    }`;
  const books = await readCMS.fetch(booksQuery)
  return {
    props: {
      books
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in at most once every second.
    revalidate: 1,
  }
}