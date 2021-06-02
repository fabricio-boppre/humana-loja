import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Masthead.module.css'

export default function Masthead() {

	// Effects:
	// - We use the Effect Hook (https://reactjs.org/docs/hooks-effect.html) to run some additional code after React has updated the DOM.
	// - Snipcart offers a JavaScript SDK (https://docs.snipcart.com/v3/sdk/basics) that lets you configure, customize and manage the cart programmatically. After the snipcart.js file has loaded and its content is done executing, a "Snipcart" object is attached to the "window" object (https://developer.mozilla.org/en-US/docs/Web/API/Window); from there, you can directly interact with the SDK. But, because the "window" object is present only at client-side (available only after React has updated the DOM), to use the Snipcart JavaScript SDK we need to do it using the Effect Hook;
	// - Effects are declared inside the component so they have access to its props and state. By default, React runs the effects after every render, including the first render;
	// - If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
  useEffect(() => {
		// Let's check if the browser is Internet Explorer 11: if it is, we hide the store and show just an "Incompatible browser" message because Snipcart doesn't work well with IE:
		// - Below IE11 we already took care via no-flexbox fallback.
		function isIE11() {
			const ua = window.navigator.userAgent; // Check the userAgent property of the window.navigator object;
			const trident = ua.indexOf('Trident/'); // IE 11.
			return (trident > 0);
		}
		if (isIE11()) {
			const divMastheadPrincipal = document.getElementById(styles.masthead);		
			const divPrincipal = document.getElementById('principal');		
			const divIncompatibleBrowser = document.getElementById('incompatible-browser');		
			divMastheadPrincipal.style.display = "none"
			divPrincipal.style.display = "none"
			divIncompatibleBrowser.style.display = "block"
		}
  }, [])
  useEffect(() => {
		// Let's change some Snipcart labels with the JavaScript SDK:
		// - English language file for the labels (it works as a baseline): https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json
    document.addEventListener('snipcart.ready', function() {
      Snipcart.api.session.setLanguage('pt-BR', {
          actions: {
            back_to_store: "Voltar à loja"
          },
          cart: {
            view_detailed_cart: "Ver carrinho completo"
          },
					address_form: {
						country: "País"
					}
      })
    });
  }, [])

  return <header id={styles.masthead}>
          
          <div id="masthead-principal">

            <Link href="/">
              <a id="masthead-logotipo">
              </a>
            </Link>
            
            <div id="masthead-services">
              <ul>
                <li>
                  <a href="https://www.facebook.com/pages/category/Bookstore/Humana-Sebo-e-Livraria-436455317131153/">
                    <Image
                      src="/img/layout/servico-facebook.svg"
                      alt="facebook"
                      title="facebook" 
                      width="12.46px"
                      height="60"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/humanasebolivraria/">
                    <Image
                      src="/img/layout/servico-instagram.svg"
                      alt="instagram"
                      title="instagram"
                      width="27"
                      height="60"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UC5bVFV4JYUDLPiJay49fM0w">
                    <Image
                      src="/img/layout/servico-youtube.svg"
                      alt="youtube"
                      title="youtube"
                      width="39"
                      height="60"
                    />
                  </a>
                </li>
              </ul>
            </div>
          
          </div>
            
         </header>
}
