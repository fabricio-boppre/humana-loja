import App from "next/app";
import Script from "next/script";
import Masthead from "../components/Masthead";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import CheckoutButtonAndInfo from "../components/CheckoutButtonAndInfo";
import AccountButton from "../components/AccountButton";
import "../styles/reset.css"; // First let's reset some CSS definitions...
import "../styles/globals.css"; // And then apply our globals.

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// - The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page;
// - pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
export default class Humana extends App {
  // States:
  // - homeClicked helps us to avoid a useless index re-render after a click on the logo, in some circumstances.
  state = { homeClicked: false };

  // Methods that update our homeClicked:
  // - Arrow functions make .bind method calls in the constructor unnecessary;
  // - (Because they lexically bind their context so this actually refers to the originating context; that’s called Lexical Scoping.)
  // - https://www.taniarascia.com/es6-syntax-and-feature-overview/#arrow-functions
  // - https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
  setHomeClicked = () => {
    this.setState({ homeClicked: true });
  };
  unsetHomeClicked = () => {
    this.setState({ homeClicked: false });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <div id="incompatible-browser">
          <p>
            Infelizmente o nosso site não funciona neste browser. Por favor,
            atualize-o para uma versão mais recente.
          </p>
        </div>

        <a
          href="https://api.whatsapp.com/send?phone=554933164566"
          id="fixedWhatsAppIcon"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="38"
            height="38"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z"></path>
              </g>
            </g>
          </svg>
        </a>

        <Masthead handleHomeClicked={this.setHomeClicked} />

        <div id="opening-sale">
          A Humana oferece FRETE GRÁTIS (via Correios - Registro Módico) nas
          compras acima de R$ 150,00
        </div>

        <div id="principal">
          <div id="principal-nucleus">
            <SearchForm />

            <AccountButton />

            <CheckoutButtonAndInfo />

            <Component
              {...pageProps}
              homeClicked={this.state.homeClicked}
              finishHomeClicked={this.unsetHomeClicked}
            />
          </div>
        </div>

        <Footer />

        <Script src="/js/modernizr-custom.js" />
        <Script src="https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.js" />
        <div
          hidden
          id="snipcart"
          data-api-key={process.env.SNIPCART_API_KEY}
          data-templates-url="/snipcart-templates.html"
          data-config-modal-style="side"
        ></div>
        <Script
          src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"
          onLoad={() => {
            algoliasearchNetlify({
              appId: "519SKT1U6K",
              apiKey: "d2573d3df1e2b3589328f740fbce7a02",
              siteId: "63123b87-3b3b-4993-ac15-6b4b33392e6b",
              branch: "main",
              selector: "div#searchAlgolia",
              placeholder: "pesquisar",
              detached: false,
              hitsPerPage: 20,
            });
          }}
        />
      </>
    );
  }
}
