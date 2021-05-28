import Image from 'next/image'
import { useEffect } from 'react'
import styles from './SearchForm.module.css'

export default function SearchForm() {

	// Let's create an effect that show the info only if there is at least on item in the cart:
	// - The info div starts as display:none and the adding or removing itens toggles this value;
	// - See the explanation of why we use useEffect in the Masthead.js component.
  var itensCount = 0
	useEffect(() => {
    const divSnipcartItemsCountAndPrice = document.getElementById('snipcart-items-count-and-price');
		document.addEventListener('snipcart.ready', function() {
			Snipcart.store.subscribe(() => {
			  const itensCount = Snipcart.store.getState().cart.items.count
				if (itensCount > 0) {
					divSnipcartItemsCountAndPrice.style.display = "block"
				} else {
					divSnipcartItemsCountAndPrice.style.display = "none"
				}
			});
    });
  }, [])

  return <div id={styles.search_form}>
					
					<form>
						<input type="text" name="searchString" defaultValue="[em construção]"/>
						<input type="submit" value="pesquisar" />
					</form>

         </div>

}
