import Link from 'next/link'
import styles from './ShowcasePagination.module.css'

export default function ShowcasePagination(props) {
	return <div className={styles.showcase_pagination}>

	          <div id="previous-page">
							<div id="previous-page-button" 
									 onClick={() => {props.clickPreviousPage()}}
									 className={(props.page == 1) ? "inactive" : ""} >
								<div className="arrow-left"></div>
								<div className="text">página anterior</div>
							</div>
						</div>

	          <div id="information">
							página {props.page} de {props.pagesTotal} | {props.booksTotal} livro(s) no total
						</div>
						
	          <div id="next-page">
							<div id="next-page-button"
								   onClick={() => {props.clickNextPage()}}
								   className={(props.page == props.pagesTotal) ? "inactive" : ""}> 
				 				<div className="text">próxima página</div>
								<div className="arrow-right"></div>
							</div>
						</div>

  			 </div>
}
