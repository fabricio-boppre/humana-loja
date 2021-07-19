import { useEffect } from 'react'
import styles from './CheckoutButtonAndInfo.module.css'

export default function CheckoutButtonAndInfo() {

	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component.
	// - Let's create an effect that show the info only if there is at least on item in the cart:
	// - The info div starts as display:none and the adding or removing itens toggles this value.
	useEffect(() => {
		document.addEventListener('snipcart.ready', function() {
	  	var itensCount = 0
			const divSnipcartItemsCount = document.getElementById('snipcart-items-count');
	    const divSnipcartItemsPrice = document.getElementById('snipcart-total-price');
			// The subscribe method triggers a callback every time an action is dispatched:
			Snipcart.store.subscribe(() => {
			  const itensCount = Snipcart.store.getState().cart.items.count
				if (itensCount > 0) {
					divSnipcartItemsCount.style.display = "inline-block"
					divSnipcartItemsPrice.style.display = "block"
				} else {
					divSnipcartItemsCount.style.display = "none"
					divSnipcartItemsPrice.style.display = "none"
				}
			});
    });
  }, [])

  return (
		<div id={styles.checkout_button_and_info}>

      <button className="snipcart-checkout">
				<div id="snipcart-items-count" className="snipcart-items-count" style={{display:'none'}}></div>
			</button>
			<div id="snipcart-total-price" className="snipcart-total-price" style={{display:'none'}}></div>

   </div>
	)
}
