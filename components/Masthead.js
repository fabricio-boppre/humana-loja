import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from './Masthead.module.css'

export default function Masthead(props) {

	// Router:
	// - See the explanation of why we use Router Hook in the index.js page.
  const router = useRouter()
	
	// isHome will decide if we should set homeClicked true or not:
	// - If we are not on home, then we should set homeClicked true (we do this at the onClick of #masthead-logotipo), because it will help us avoid a second routing in the routing effect of the index page
	var isHome = false
	if (router.asPath == '/') {
		isHome = true
	}
	
	// Effects:
	// - We use the Effect Hook (https://reactjs.org/docs/hooks-effect.html) to run some additional code after React has updated the DOM.
	// - Snipcart offers a JavaScript SDK (https://docs.snipcart.com/v3/sdk/basics) that lets you configure, customize and manage the cart programmatically. After the snipcart.js file has loaded and its content is done executing, a "Snipcart" object is attached to the "window" object (https://developer.mozilla.org/en-US/docs/Web/API/Window); from there, you can directly interact with the SDK. But, because the "window" object is present only at client-side (available only after React has updated the DOM), to use the Snipcart JavaScript SDK we need to do it using the Effect Hook;
	// - Effects are declared inside the component so they have access to its props and state. By default, React runs the effects after every render, including the first render;
	// - If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

	// Let's check if the browser is Internet Explorer 11: if it is, we hide the store and show just an "Incompatible browser" message because Snipcart doesn't work well with IE:
	// - Below IE11 we already took care via no-flexbox fallback.
  useEffect(() => {
		function isIE11() {
			const ua = window.navigator.userAgent; // Check the userAgent property of the window.navigator object;
			const trident = ua.indexOf('Trident/'); // IE 11.
			return (trident > 0);
		}
		if (isIE11()) {
			const divMastheadPrincipal = document.getElementById(styles.masthead)
			const divPrincipal = document.getElementById('principal')
			const divFooterContent = document.getElementById('footer-content')
			const divIncompatibleBrowser = document.getElementById('incompatible-browser')
			divMastheadPrincipal.style.display = "none"
			divPrincipal.style.display = "none"
			divFooterContent.style.display = "none"
			divIncompatibleBrowser.style.display = "block"
		}
  }, [])

	// Let's change some Snipcart labels and payment form styles:
	// - English language file for the labels (it works as a baseline): https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json
	// - To customize the payment form styles we can't use CSS because they are inside an iframe. We use customization.registerPaymentFormCustomization method: https://docs.snipcart.com/v3/sdk/api#customizationregisterpaymentformcustomization
  useEffect(() => {
    document.addEventListener('snipcart.ready', function() {
      Snipcart.api.theme.customization.registerPaymentFormCustomization({
				label: {
					fontSize: '14px',
				}				
			});
			Snipcart.api.session.setLanguage('pt-BR', {
          actions: {
            back_to_store: "Voltar à loja",
						back_to_orders: "Voltar aos seus pedidos",
						save_changes: "Salvar alterações",
          },
					address_form: {
						address1: "Endereço (logradouro / número / bairro)",
					},
          cart: {
            view_detailed_cart: "Ver carrinho completo"
          },
			    change_password_form: {
			        title: "Alterar sua senha",
			        current_password: "Senha atual",
			        password: "Nova senha",
			        confirmation_password: "Confirme sua nova senha",
			        action: "Alterar sua senha",
							back_to_orders: "Voltar aos pedidos",
			    },
			    countries: {
			        BR: {
			            name: "Brasil"
			        },
					},
			    customer: {
			      information: "Informações do cliente",
			    },
 				  customer_dashboard: {
						my_account: "Sua conta",
						show_more_orders: "Exibir mais pedidos |||| Exibir mais pedidos",
						orders: "Pedidos",
						view_invoice: "Ver nota fiscal",
					},
			    customer_details: {
			        title: "Seu cadastro",
			    },
			    default: {
			        loading: "Carregando...",
			        error: "Um erro aconteceu.",
			        success: "Sucesso!",
			    },
					errors: {
		        card: {
		          invalid_number: "Número de cartão inválido.",
		          invalid_date: "Data de expiração do cartão inválida.",
		          invalid_year: "Ano de expiração do cartão inválido.",
		          invalid_month: "Mês de expiração do cartão inválido.",
		          invalid_cvv: "Código CVV inválido.",
		          invalid_expiration: "Data de expiração do cartão inválida.",
		          expired: "O cartão está expirado.",
		          declined: "Seu cartão foi rejeitado. Entre em contato com o seu banco para mais informações.",
		          invalid_address: "Endereço do cartão inválido.",
		          insufficient_funds: "Sua conta não possui saldo suficiente.",
		          card_not_supported: "Este cartão não é aceito nesta região.",
		          currency_not_supported: "No momento não aceitamos esta moeda."
		        },
		        transaction: {
		          declined: "Houe um erro no processamento do seu cartão. Por gentileza, tente novamente."
		        },
		        discounts: {
		          conflict: "Alguns descontos não podem ser utilizados conjuntamente. Usar este desconto?"
		        },
		        shippingRates: {
		          loading: "Carregando os valores de frete",
		        },						
					},
          payment: {
						form: {
            	deferred_payment_title: "Pagamento posterior via transação bancária ou Pix",
							deferred_payment_instructions: "Você receberá em seu email as instruções para o pagamento via Pix ou transferência bancária com o recibo de seu pedido. Em caso de dúvidas, entre em contato pelo nosso WhatsApp: (49) 3316-4566.",
							invalid_cvv: "CVV inválido",
						},
            methods: {
							deferred_payment: "Pagar depois via transação bancária ou Pix",
						},
          },					
          register_form: {
            requires_action: {
							title: "Verifique sua caixa de entrada",
							description: "Este endereço de email já foi utilizado em uma compra anterior. Para completar o seu registro, verifique a mensagem que acabamos de lhe enviar.",
						},
          },
			    shipping: {
			      method: "Método de envio",
			    },
      })
    });
  }, [])

  return <header id={styles.masthead}>
          
          <div id="masthead-nucleus">
						
			      <Link href="/">
			        <a id="masthead-logotipo" onClick={isHome ? undefined : () => props.handleHomeClicked()}>
								<span hidden>Humana</span>
							</a>
			      </Link>
			      
            <div id="masthead-phone">
							<a href="https://api.whatsapp.com/send?phone=554933164566" target="_blank" rel="noreferrer">
								<span id="masthead-phone-text">
									Quer conversar com o livreiro?
								</span>
	              <Image
	                src="/img/layout/servico-whatsapp.svg"
	                alt="telefone"
	                width={24}
	                height={24}
									className="masthead-phone-icon"
	              />
								<span id="masthead-phone-number">
									49 3316-4566
								</span>
							</a>
            </div>
						          
          </div>
            
         </header>
}
