import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ShowcaseFiltersAndOrder(props) {

	// States:
	// - See the explanation of why we use State Hook in the /index.js page.
	// - Visibility of order options:
	const [orderOptionsVisible, setOrderOptionsVisibility] = useState(false);
	// - Visibility of filter options:
	const [filterOptionsVisible, setFilterOptionsVisibility] = useState(false);

	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component.
	// - If the body is bigger than our $tablet-width (see the /styles/assets.scss file), then we start with our order and filter options visible.
	useEffect(() => {
		if (document.body.clientWidth > 768) {
			setOrderOptionsVisibility(true)
			setFilterOptionsVisibility(true)
		}
	}, [])
	
	// Functions to handle the click on the visibility option of the order and filter options:
	const clickOrderOptionsVisibility = () => {
		setOrderOptionsVisibility(!orderOptionsVisible)
	}
	const clickFilterOptionsVisibility = () => {
		setFilterOptionsVisibility(!filterOptionsVisible)
	}

	const iconOpen = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path></svg>
	const iconClose = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="m15.842432 15.325157-3.844941-3.914745-3.914745 3.844942a.99702056.99702056 0 1 1 -1.3972596-1.422627l4.6311026-4.5485257a.996.996 0 0 1 1.409943.012683l4.548526 4.6311024a.996.996 0 0 1 -.01268 1.409943c-.393403.376477-1.033467.380719-1.419943-.01277z"/></svg> 
	const orderOpen = <><span>exibir opções de ordenação</span>{iconOpen}</>
	const orderClose = <><span>ocultar opções de ordenação</span>{iconClose}</>
	const filterOpen = <><span>exibir opções de filtro</span>{iconOpen}</>
	const filterClose = <><span>ocultar opções de filtro</span>{iconClose}</>
		
	return <div id="showcase-filters-order">

						<div className="order-header"
						     onClick={() => {clickOrderOptionsVisibility()}}>
							   {orderOptionsVisible ? orderClose: orderOpen }
						</div>
						<ul className={orderOptionsVisible ? "visible" : "invisible"} >
							<li>
								<div className="title">
										 {props.bookPublicationYear.title}:
								</div>
								<ul>
									<li onClick={() => {props.clickOrder(props.bookPublicationYear.publicationYearDescId)}} 
										  className={props.isOrderActive(props.bookPublicationYear.publicationYearDescId) ? "active" : ""}>
											{props.bookPublicationYear.publicationYearDescTitle}
									</li>
									<li onClick={() => {props.clickOrder(props.bookPublicationYear.publicationYearAscId)}}
										  className={props.isOrderActive(props.bookPublicationYear.publicationYearAscId) ? "active" : ""}>
											{props.bookPublicationYear.publicationYearAscTitle}
									</li>
								</ul>
							</li>
							<li>
								<div className="title">
										 {props.bookPrices.title}:
								</div>
								<ul>
									<li onClick={() => {props.clickOrder(props.bookPrices.priceDescId)}} 
										  className={props.isOrderActive(props.bookPrices.priceDescId) ? "active" : ""}>
											{props.bookPrices.priceDescTitle}
									</li>
									<li onClick={() => {props.clickOrder(props.bookPrices.priceAscId)}}
										  className={props.isOrderActive(props.bookPrices.priceAscId) ? "active" : ""}>
											{props.bookPrices.priceAscTitle}
									</li>
								</ul>
							</li>
						</ul>

						<div className="filter-header"
						     onClick={() => {clickFilterOptionsVisibility()}}>
								 {filterOptionsVisible ? filterClose: filterOpen }
						</div>
						<ul className={filterOptionsVisible ? "visible" : "invisible"} >
							<li>
								<div onClick={() => {props.clickFilterType(props.bookFormats.id)}}
										 className={"title " + (props.isFilterTypeActive(props.bookFormats.id) ? "active" : "")}>
										 {props.bookFormats.title}:
								</div>
								<ul>
									<li onClick={() => {props.clickFilter(props.bookFormats.formatLivroId,props.bookFormats.id)}} 
										  className={props.isFilterActive(props.bookFormats.formatLivroId,props.bookFormats.id) ? "active" : ""}>
											{props.bookFormats.formatLivroTitle}
									</li>
									<li onClick={() => {props.clickFilter(props.bookFormats.formatEbookId,props.bookFormats.id)}} 
										  className={props.isFilterActive(props.bookFormats.formatEbookId,props.bookFormats.id) ? "active" : ""}>
											{props.bookFormats.formatEbookTitle}
									</li>
								</ul>
							</li>
							<li>
								<div onClick={() => {props.clickFilterType(props.bookConditions.id)}}
										 className={"title " + (props.isFilterTypeActive(props.bookConditions.id) ? "active" : "")}>
										 {props.bookConditions.title}:
								</div>
								<ul>
									<li onClick={() => {props.clickFilter(props.bookConditions.conditionNovoId,props.bookConditions.id)}} 
										  className={props.isFilterActive(props.bookConditions.conditionNovoId,props.bookConditions.id) ? "active" : ""}>
											{props.bookConditions.conditionNovoTitle}
									</li>
									<li onClick={() => {props.clickFilter(props.bookConditions.conditionUsadoId,props.bookConditions.id)}} 
										  className={props.isFilterActive(props.bookConditions.conditionUsadoId,props.bookConditions.id) ? "active" : ""}>
											{props.bookConditions.conditionUsadoTitle}
									</li>
								</ul>
							</li>
							<li>
								<div onClick={() => {props.clickFilterType(props.bookPriceRanges.id)}}
										 className={"title " + (props.isFilterTypeActive(props.bookPriceRanges.id) ? "active" : "")}>
										 {props.bookPriceRanges.title}:
								</div>
								<ul>
									<li onClick={() => {props.clickFilter(props.bookPriceRanges.priceRangeUpTo30Id,props.bookPriceRanges.id)}} 
										  className={props.isFilterActive(props.bookPriceRanges.priceRangeUpTo30Id,props.bookPriceRanges.id) ? "active" : ""}>
											{props.bookPriceRanges.priceRangeUpTo30Title}
									</li>
									<li onClick={() => {props.clickFilter(props.bookPriceRanges.priceRange31to60Id,props.bookPriceRanges.id)}} 
										  className={props.isFilterActive(props.bookPriceRanges.priceRange31to60Id,props.bookPriceRanges.id) ? "active" : ""}>
											{props.bookPriceRanges.priceRange31to60Title}
									</li>
									<li onClick={() => {props.clickFilter(props.bookPriceRanges.priceRange61to90Id,props.bookPriceRanges.id)}} 
										  className={props.isFilterActive(props.bookPriceRanges.priceRange61to90Id,props.bookPriceRanges.id) ? "active" : ""}>
											{props.bookPriceRanges.priceRange61to90Title}
									</li>
									<li onClick={() => {props.clickFilter(props.bookPriceRanges.priceRange91onwardsId,props.bookPriceRanges.id)}} 
										  className={props.isFilterActive(props.bookPriceRanges.priceRange91onwardsId,props.bookPriceRanges.id) ? "active" : ""}>
											{props.bookPriceRanges.priceRange91onwardsTitle}
									</li>
								</ul>
							</li>
							<li>
								<div onClick={() => {props.clickFilterType(props.bookCategories.id)}}
										 className={"title " + (props.isFilterTypeActive(props.bookCategories.id) ? "active" : "")}>
										 {props.bookCategories.title}:
								</div>
								<ul>
									{props.bookCategories.categories.map((category,index) => 
										<li onClick={() => {props.clickFilter(category.slug,props.bookCategories.id)}} 
											  key={index}
												className={props.isFilterActive(category.slug,props.bookCategories.id) ? "active" : ""}>
												{category.name}
										</li>
									)}
								</ul>
							</li>
						</ul>

  			 </div>
}
