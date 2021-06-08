import Link from 'next/link'
import styles from './ShowcasePagination.module.css'

export default function ShowcasePagination(props) {
	return <div className={styles.showcase_pagination}>

		        <Link href={{pathname: '/',
						  				   query: {page: parseInt(props.page)-1 } }}>
		          <a id="previous-page" className={(props.page == 1) ? "inactive" : ""} >
								<div className="arrow-left"></div>
								<div className="text">página anterior</div>
							</a>
		        </Link>
	
		        <Link href={{pathname: '/',
						  				   query: {page: parseInt(props.page)+1 } }}>
		          <a id="next-page" className={(props.page == props.pagesTotal) ? "inactive" : ""} >
								<div className="text">próxima página</div>
								<div className="arrow-right"></div>
							</a>
		        </Link>

  			 </div>
}
