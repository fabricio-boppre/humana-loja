import Link from 'next/link'
import styles from './SearchForm.module.css'

export default function SearchForm(props) {

  return (
		<div id={styles.search_form}>
			<form>
			  <label hidden htmlFor="formSearchString">pesquisar:</label>
				<input type="search" 
							 id="formSearchString" 
							 placeholder="título, autor ou editora" 
							 value={props.formSearchString} 
							 onChange={props.setFormSearchString}/>
    		<Link href={`/?search=${encodeURIComponent(props.formSearchString)}`} passHref>
					<button onClick={() => props.handleSearchButton()}>pesquisar</button>
				</Link>
			</form>
     </div>
	)
}
