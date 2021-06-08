import Link from 'next/link'

export default function ShowcaseOptions(props) {
	return <div id="showcase-options">

						<span id="showcase-options-filters" onClick={props.clickFiltersHorizontal}>
							{props.filtersHorizontalActive ? "fechar filtros" : "exibir filtros"}|
						</span>

						<span id="showcase-options-order">ordenação|</span>

						<span id="showcase-options-layout">layout</span>

				 </div>
}
