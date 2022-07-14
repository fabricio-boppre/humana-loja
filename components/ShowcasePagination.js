import Link from 'next/link'
import styles from './ShowcasePagination.module.css'

export default function ShowcasePagination(props) {
	return <div className={styles.showcase_pagination}>
						{(props.page - 1) > 1 && 
							<div id="first"
							onClick={() => {props.goToPage(1)}}>
								1
							</div>							
						}
						{(props.page - 1) > 2 && 
							<div id="interval">...</div>
						}
						{props.page > 1 && 
							<div id="previous"
							onClick={() => {props.goToPage(props.page - 1)}}>
								{props.page - 1}
							</div>
						}
						<div id="current">
							{props.page}
						</div>
						{(props.page + 1) <= props.pagesTotal && 
							<div id="next"
									 onClick={() => {props.goToPage(props.page + 1)}}>
								{props.page + 1}
							</div>
						}
						{(props.page + 2) < props.pagesTotal && 
							<div id="interval">...</div>
						}
						{(props.page + 1) < props.pagesTotal && 
							<div id="last"
							onClick={() => {props.goToPage(props.pagesTotal)}}>
								{props.pagesTotal}
							</div>
						}
				 </div>
}
