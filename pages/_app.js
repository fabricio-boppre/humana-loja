import App from 'next/app'
import Head from 'next/head'
import Masthead from '../components/Masthead'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import CheckoutButtonAndInfo from '../components/CheckoutButtonAndInfo'
import AccountButton from '../components/AccountButton'
import '../styles/reset.css' // First let's reset some CSS definitions...
import '../styles/globals.css' // And then apply our globals.

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// - The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page;
// - pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
export default class Humana extends App {

  // States:
	// - formSearchString is the content of the search form;
	// - searchCount helps us re-render the component, when the search button is clicked;
  // - homeClicked helps us to avoid a useless index re-render after a click on the logo, in some circumstances.
	state = {formSearchString: '',
					 searchCount: 0,
					 homeClicked: false}
						
	// Methods:
	// - Arrow functions make .bind method calls in the constructor unnecessary;
	// - (Because they lexically bind their context so this actually refers to the originating context; that’s called Lexical Scoping.)
	// - https://www.taniarascia.com/es6-syntax-and-feature-overview/#arrow-functions
	// - https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
  // - Methods that set a new search string on the form (via user typing or via user opening an URI with a search query string in it):
	setFormSearchString = (e) => { this.setState({formSearchString: e.target.value}) }
	setFormSearchStringWithValue = (value) => { this.setState({formSearchString: value}) }
  // - Methods that update our searchCount, which triggers a new search:
	handleSearchButton = () => { this.setState({ searchCount: this.state.searchCount + 1 }) }
	zeroSearchCount = () => { this.setState({ searchCount: 0 }) }
	// - Methods that update our homeClicked:
	setHomeClicked = () =>  { this.setState({ homeClicked: true }) }
	unsetHomeClicked = () =>  { this.setState({ homeClicked: false }) }
	
	render() {
		
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
 	        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
        </Head>

        <Masthead handleHomeClicked={this.setHomeClicked}/>
				
				<div id="opening-sale">Promoção de abertura: <span className="highlight">frete grátis</span> para compras acima de R$ 150,00</div>

        <div id="incompatible-browser">
					<p>Infelizmente o nosso site não funciona neste browser. Por favor, atualize-o para uma versão mais recente.</p>
				</div>
				
				<div id="principal">
				
					<div id="principal-nucleus">

						<SearchForm formSearchString={this.state.formSearchString}
												setFormSearchString={this.setFormSearchString}
												setFormSearchStringWithValue={this.setFormSearchStringWithValue}
												handleSearchButton={this.handleSearchButton}
												searchCount={this.state.searchCount} />
												
						<AccountButton />
	
						<CheckoutButtonAndInfo  />
						
	          <Component {...pageProps} 
											 formSearchString={this.state.formSearchString}
											 setFormSearchStringWithValue={this.setFormSearchStringWithValue}
											 zeroSearchCount={this.zeroSearchCount}
											 searchCount={this.state.searchCount}
											 homeClicked={this.state.homeClicked}
											 finishHomeClicked={this.unsetHomeClicked} />

					</div>
					
        </div>
				
				<Footer />

        <script src="/js/modernizr-custom.js"></script>
				<script async src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"></script>
        <div hidden id="snipcart" data-api-key={process.env.SNIPCART_API_KEY} data-config-modal-style="side"></div>

      </>
   );
  }
}