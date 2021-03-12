import App from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// - The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page;
// - pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
export default class Humana extends App {

	// Initial State:
  // state = {fullScreenMenu: 'off'}

	// Methods: 
	// - Arrow functions make .bind method calls in the constructor unnecessary;
	// - (Because they lexically bind their context so this actually refers to the originating context; that’s called Lexical Scoping.)
	// - https://www.taniarascia.com/es6-syntax-and-feature-overview/#arrow-functions
	// - https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf

  // Methods that open or close the full screen menu:
  
  render() {

    const { Component, pageProps } = this.props;

    return (

      <>

        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script src="/js/modernizr-custom.js"></script>
        </Head>

        <div id="main">
          
          <section id="content">
            <Component {...pageProps} />
          </section>
                    
        </div>
      
      </>
   );
  }
}