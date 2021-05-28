import Image from 'next/image'
import Link from 'next/link'

export default function IndexOptions(props) {
	return <div id="index-options">

						<span id="index-options-filters" onClick={props.clickFiltersHorizontal}>
							{props.filtersHorizontalActive ? "fechar filtros" : "exibir filtros"}|
						</span>

						<span id="index-options-order">ordenação|</span>

						<span id="index-options-layout">layout</span>

				 </div>
}
