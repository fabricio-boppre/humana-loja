import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {

	// We take the opportunity to change some labels with the JavaScript SDK (https://docs.snipcart.com/v3/sdk/basics):
	// - Snipcart offers a JavaScript SDK that lets you configure, customize and manage the cart programmatically. After the snipcart.js file has loaded and its content is done executing, a "Snipcart" object is attached to the "window" object (https://developer.mozilla.org/en-US/docs/Web/API/Window). From there, you can directly interact with the SDK;
	// - Because the "window" object is present only at client-side, we use the Effect Hook (https://reactjs.org/docs/hooks-effect.html), which allow us to run some additional code after React has updated the DOM and the "window" object is available;
	// - English language file for the labels (it works as a baseline): https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json
  useEffect(() => {
    document.addEventListener('snipcart.ready', function() {
        Snipcart.api.session.setLanguage('pt-BR', {
            cart: {
              view_detailed_cart: "Ver carrinho completo"
            }
        })
    });
  }, [])

  return <div id={styles.header}>
          
          <div id="header-content">

            <Link href="/">
              <a id="header-logotipo">
              </a>
            </Link>
            
            <div id="header-services">
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
            
         </div>
}
