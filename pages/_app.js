import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import App from 'next/app'
import Head from 'next/head'
import Header from '../components/Header.js';
import '../styles/reset-min.css' // First let's reset some CSS definitions...
import '../styles/globals.css' // And then apply our globals.

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// - The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page;
// - pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
export default class Humana extends App {

  render() {

    const { Component, pageProps } = this.props;

    return (

      <>

        <Head>
          <link rel="icon" href="/favicon.ico" />
 	        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,700;1,300;1,700&display=swap" />
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css" />
          <script src="/js/modernizr-custom.js"></script>
        </Head>

        <div id="main">
        
          <Header />

          <div id="content">

            <div id="checkout-items-count-price">
              <button className="snipcart-checkout">Click here to checkout</button>
              <div>
                <span className="snipcart-items-count"></span> livro(s) | <span className="snipcart-total-price"></span>
              </div>
            </div>

            <Component {...pageProps} />

          </div>

          <script async src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"></script>
          <div hidden id="snipcart" data-api-key="OGEyNjNlZGYtZmYyNi00MGM0LWI2ZjktYjI0YWM0MTM0MDBjNjM3NTA4MDU0NTE2ODU3Njcz" data-config-modal-style="side"></div>
                    
        </div>
      
      </>
   );
  }
}