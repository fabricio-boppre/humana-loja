import { useEffect } from 'react'
import Image from 'next/image'
import styles from './CheckoutButtonAndInfo.module.css'

export default function CheckoutButtonAndInfo() {

	// Effects:
	// - See the explanation of why we use Effect Hook in the Masthead.js component.
	useEffect(() => {
		// Let's create an effect that show the info only if there is at least on item in the cart:
		// - The info div starts as display:none and the adding or removing itens toggles this value.
		document.addEventListener('snipcart.ready', function() {
	  	var itensCount = 0
	    const divSnipcartItemsCountAndPrice = document.getElementById('snipcart-items-count-and-price');
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

  return <div id={styles.checkout_button_and_info}>

            <button className="snipcart-checkout">
              <Image
                src="/img/layout/shopping-cart.svg"
                alt="carrinho"
                title="carrinho"
                width="48"
                height="48"
              />
						</button>

            <div id="snipcart-items-count-and-price" style={{display:'none'}}>
							<div><span className="snipcart-items-count"></span> item(s)</div> 
							<div className="snipcart-total-price"></div>
            </div>

         </div>

}
