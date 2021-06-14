import Link from 'next/link'

export default function ShowcaseFilters(props) {
	
	return <div id="showcase-filters" className={props.filtersHorizontalActive ? "horizontal-active" : ""}>
					<ul>
						<li>
							<span onClick={() => {props.clickFilterType(props.bookFormats.id)}}
										className={"filter-title " + (props.isFilterTypeActive(props.bookFormats.id) ? "active" : "")}>
										{props.bookFormats.title}:
							</span>
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
							<span onClick={() => {props.clickFilterType(props.bookConditions.id)}}
									  className={"filter-title " + (props.isFilterTypeActive(props.bookConditions.id) ? "active" : "")}>
									  {props.bookConditions.title}:
							</span>
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
					</ul>
  			 </div>
}
