import Link from 'next/link'

export default function ShowcaseOptions(props) {
	return <div id="showcase-options">

						<span id="showcase-options-filters" onClick={props.clickFiltersHorizontal}>
							{props.filtersHorizontalActive ? "fechar filtros" : "exibir filtros"}|
						</span>

						<span id="showcase-options-order">ordenar por preço ($ > $$ / $$ > $) ou título (A > Z / Z > A)</span>

				 </div>
}
