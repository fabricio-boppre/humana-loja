import Image from 'next/image'
import { useEffect } from 'react'
import styles from './CheckoutButtonAndInfo.module.css'

export default function CheckoutButtonAndInfo() {

	// Let's create an effect that show the info only if there is at least on item in the cart:
	// - The info div starts as display:none and the adding or removing itens toggles this value;
	// - See the explanation of why we use useEffect in the Header.js component.
  var itensCount = 0
	useEffect(() => {
    const div = document.getElementById('snipcart-items-count-and-price');
		document.addEventListener('snipcart.ready', function() {
			Snipcart.store.subscribe(() => {
			  const itensCount = Snipcart.store.getState().cart.items.count
			  console.log(itensCount)
				if (itensCount > 0) {
					div.style.display = "block"
				} else {
					div.style.display = "none"
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
							<span className="snipcart-items-count"></span> item(s) | <span className="snipcart-total-price"></span>
            </div>

         </div>

}
