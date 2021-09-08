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

	// Let's change some Snipcart labels:
	// - English language file for the labels (it works as a baseline): https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json
  useEffect(() => {
    document.addEventListener('snipcart.ready', function() {
      Snipcart.api.session.setLanguage('pt-BR', {
          actions: {
            back_to_store: "Voltar à loja",
						back_to_orders: "Voltar aos seus pedidos",
						save_changes: "Salvar alterações",
          },
					address_form: {
						country: "País",
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

	// Let's make some customizations on the Snipcart cart templates:
	// - We do them here, and not directly inside the div#snipcart that initialises Snipcart in the _app.js (as the Snipcart documentations suggests) because we need to interact with the "Snipcart" object.
  useEffect(() => {
    document.addEventListener('snipcart.ready', function() {
			var snipcart  = document.getElementById('snipcart')
			// Adding CPF field in the billing component:
			// - https://docs.snipcart.com/v3/themes/default/reference#component-billing
			var billing = document.createElement('billing')
			billing.setAttribute('section', 'top')
			const billingChild = `
				<fieldset>
					<div id="form-cpf">
						<snipcart-label for="cpf">CPF</snipcart-label>
						<snipcart-input name="cpf" minlength="11" maxlength="11" type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" required></snipcart-input>
					</div>
				</fieldset>
			`
			billing.innerHTML += billingChild
			snipcart.appendChild(billing)
			// In the item-line component, we exclude products descriptions:
			// - https://docs.snipcart.com/v3/themes/default/reference#component-item-line
			var itemLine = document.createElement('item-line')
			const itemLineChild = `
				<li :class="{'snipcart-item-line': true, 'snipcart-item-line--cart-edit': editingCart}">
				    <flash-message
				        type="info"
				        icon="box"
				        v-if="stockLimitReached"
				    >
				        {{ $localize('errors.quantity_revised') }}
				    </flash-message>
				    <flash-message
				        type="error"
				        icon="box"
				        v-if="outOfStock"
				    >
				        {{ $localize('errors.quantity_out_of_stock') }}
				    </flash-message>
				    <div class="snipcart-item-line__container">
				        <figure
				            class="snipcart-item-line__media"
				            v-if="showLargeImage"
				        >
				            <item-image class="snipcart-item-line__image"></item-image>
				        </figure>
				        <div class="snipcart-item-line__product">
				            <div class="snipcart-item-line__header">
				                <figure
				                    class="snipcart-item-line__media snipcart-item-line__media--small"
				                    v-if="showSmallImage"
				                >
				                    <item-image class="snipcart-item-line__image"></item-image>
				                </figure>
				
				                <h2 class="snipcart-item-line__title snipcart__font--xlarge snipcart__font--secondary snipcart__font--black">
				                    {{ item.name }}
				                </h2>
				
				                <button-icon
				                    icon="trash"
				                    label="item.remove_item"
				                    styling="danger"
				                    @click="removeItem"
				                ></button-icon>
				            </div>
				
				            <div class="snipcart-item-line__content">
				                <div class="snipcart-item-line__body">
				                    <div class="snipcart-item-line__variants">
				                        <div>
				                            <item-plans
				                                :item="item"
				                                v-if="!adding && isSubscribable"
				                            ></item-plans>
				                            <item-custom-fields v-if="!adding"></item-custom-fields>
				                        </div>
				                        <item-quantity
				                            class="snipcart-item-line__quantity"
				                            v-if="!adding && !isSubscribable"
				                            :disabled="outOfStock || isSubscribable"
				                        ></item-quantity>
				                        <div
				                            class="snipcart-form__field snipcart-form__field--plan snipcart-form__field--plan--billed-on"
				                            v-if="isSubscribable && !adding"
				                        >
				                            <span class="snipcart-form__label snipcart__font--tiny">
				                                {{$localize('subscription.payment_amount')}}
				                            </span>
				                            <div class="snipcart-form__field--plan__readonly">
				                                <item-price
				                                    :item="item"
				                                    :selectedPlan="selectedPlan"
				                                >
				                                </item-price>
				                            </div>
				                        </div>
				
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
			`
			itemLine.innerHTML += itemLineChild
			snipcart.appendChild(itemLine)
			// Creating our own address-fields component:
			// - https://docs.snipcart.com/v3/themes/default/reference#component-address-fields
			// - https://docs.snipcart.com/v3/setup/customization#customize-address-fields
			var addressFields = document.createElement('address-fields')
			const addressFieldsChild = `
		    <div>
		      <fieldset class="snipcart-form__set">

		        <div class="snipcart-form__row">
		          <div class="snipcart-form__field snipcart-form__cell--large">
		            <snipcart-label
		              class="snipcart__font--tiny"
		              for="address1"
		            >{{ $localize('address_form.address1') }}</snipcart-label>
		            <snipcart-input name="address1"></snipcart-input>
		            <snipcart-error-message name="address1"></snipcart-error-message>
		          </div>
		
		          <div class="snipcart-form__field snipcart-form__cell--tidy">
		            <snipcart-label
		              class="snipcart__font--tiny"
		              for="address2"
		            >{{ $localize('address_form.address2') }}</snipcart-label>
		            <snipcart-input name="address2"></snipcart-input>
		            <snipcart-error-message name="address2"></snipcart-error-message>
		          </div>
		        </div>
		
		        <div class="snipcart-form__field">
		          <snipcart-label
		            class="snipcart__font--tiny"
		            for="city"
		          >{{ $localize('address_form.city') }}</snipcart-label>
		          <snipcart-input name="city"></snipcart-input>
		          <snipcart-error-message name="city"></snipcart-error-message>
		        </div>
		
		        <div class="snipcart-form__row">

				      <div class="snipcart-form__field snipcart-form__cell--large">
				        <snipcart-label
				          class="snipcart__font--tiny"
				          for="province"
				        >{{ $localize('address_form.province') }}</snipcart-label>
				        <snipcart-select type="dropdown" name="province" autocomplete="province state" required>
										<option value="AC">Acre</option>
										<option value="AL">Alagoas</option>
										<option value="AP">Amapá</option>
										<option value="AM">Amazonas</option>
										<option value="BA">Bahia</option>
										<option value="CE">Ceará</option>
										<option value="DF">Distrito Federal</option>
										<option value="ES">Espírito Santo</option>
										<option value="GO">Goiás</option>
										<option value="MA">Maranhão</option>
										<option value="MT">Mato Grosso</option>
										<option value="MS">Mato Grosso do Sul</option>
										<option value="MG">Minas Gerais</option>
										<option value="PA">Pará</option>
										<option value="PB">Paraíba</option>
										<option value="PR">Paraná</option>
										<option value="PE">Pernambuco</option>
										<option value="PI">Piauí</option>
										<option value="RJ">Rio de Janeiro</option>
										<option value="RN">Rio Grande do Norte</option>
										<option value="RS">Rio Grande do Sul</option>
										<option value="RO">Rondônia</option>
										<option value="RR">Roraima</option>
										<option value="SC">Santa Catarina</option>
										<option value="SP">São Paulo</option>
										<option value="SE">Sergipe</option>
										<option value="TO">Tocantins</option>								
								</snipcart-select>
				        <snipcart-error-message name="province"></snipcart-error-message>
				      </div>								

		          <div class="snipcart-form__field snipcart-form__cell--tidy">
		            <snipcart-label
		              class="snipcart__font--tiny"
		              for="postalCode"
		            >{{ $localize('address_form.postalCode') }}</snipcart-label>
		            <snipcart-input name="postalCode" minlength="8" maxlength="8" type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"></snipcart-input>
		            <snipcart-error-message name="postalCode"></snipcart-error-message>
		          </div>
							
		        </div>

		        <div class="snipcart-form__field">
		          <snipcart-label
		            class="snipcart__font--tiny"
		            for="country"
		          >{{ $localize('address_form.country') }}</snipcart-label>
		          <snipcart-typeahead type="dropdown" name="country" autocomplete="country"></snipcart-typeahead>
		        </div>

		      </fieldset>
		    </div>
			`
			addressFields.innerHTML += addressFieldsChild
			snipcart.appendChild(addressFields)
		})
  }, [])
	
  return <header id={styles.masthead}>
          
          <div id="masthead-nucleus">
						
			      <Link href="/">
			        <a id="masthead-logotipo" onClick={isHome ? undefined : () => props.handleHomeClicked()}>
								<span hidden>Humana</span>
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
                      width={12.46}
                      height={60}
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/humanasebolivraria/">
                    <Image
                      src="/img/layout/servico-instagram.svg"
                      alt="instagram"
                      title="instagram"
                      width={27}
                      height={60}
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UC5bVFV4JYUDLPiJay49fM0w">
                    <Image
                      src="/img/layout/servico-youtube.svg"
                      alt="youtube"
                      title="youtube"
                      width={39}
                      height={60}
                    />
                  </a>
                </li>
              </ul>
            </div>
          
          </div>
            
         </header>
}
