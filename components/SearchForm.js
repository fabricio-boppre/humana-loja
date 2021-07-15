import Link from 'next/link'
import styles from './SearchForm.module.css'

export default function SearchForm(props) {

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
