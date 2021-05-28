import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import App from 'next/app'
import Head from 'next/head'
import Masthead from '../components/Masthead.js'
import SearchForm from '../components/SearchForm.js'
import CheckoutButtonAndInfo from '../components/CheckoutButtonAndInfo.js'
import '../styles/reset.css' // First let's reset some CSS definitions...
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
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
        </Head>

        <Masthead />

        <div id="incompatible-browser">
					<p>Infelizmente o nosso site não funciona neste browser. Por favor, atualize-o para uma versão mais recente.</p>
				</div>
				
				<div id="principal">

					<SearchForm />

					<CheckoutButtonAndInfo />
					
          <Component {...pageProps} />

        </div>

        <script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>

        <div hidden id="snipcart" data-api-key="OGEyNjNlZGYtZmYyNi00MGM0LWI2ZjktYjI0YWM0MTM0MDBjNjM3NTA4MDU0NTE2ODU3Njcz" data-config-modal-style="side">

					<billing section="top">
						<fieldset>
							<div>
								<snipcart-label for="cpf">CPF</snipcart-label>
								<snipcart-input name="cpf" required></snipcart-input>
							</div>
						</fieldset>
					</billing>

				</div>
      </>
   );
  }
}