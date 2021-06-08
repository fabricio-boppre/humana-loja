import Link from 'next/link'

export default function ShowcaseFilters(props) {
	return <div id="showcase-filters" className={props.filtersHorizontalActive ? "horizontal-active" : ""}>
					<span>filtros [em construção]:</span>
					<ul>
						<li>categorias</li>
						<li>formato</li>
						<li>estado</li>
					</ul>								
  			 </div>
}
