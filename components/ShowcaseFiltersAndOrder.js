import Link from 'next/link'

export default function ShowcaseFiltersAndOrder(props) {
	
	return <div id="showcase-filters-order">

						<div className="order-header">exibir/ocultar opções de ordenação:</div>
						<ul>
							<li>[em construção]</li>
						</ul>

						<div className="filters-header">exibir/ocultar opções de filtro:</div>
						<ul>
							<li>
								<div onClick={() => {props.clickFilterType(props.bookFormats.id)}}
										 className={"filter-title " + (props.isFilterTypeActive(props.bookFormats.id) ? "active" : "")}>
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
										 className={"filter-title " + (props.isFilterTypeActive(props.bookConditions.id) ? "active" : "")}>
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
								<div onClick={() => {props.clickFilterType(props.bookCategories.id)}}
										 className={"filter-title " + (props.isFilterTypeActive(props.bookCategories.id) ? "active" : "")}>
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
