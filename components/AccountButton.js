import { useEffect } from "react";
import styles from "./AccountButton.module.css";

export default function AccountButton() {
  // Effects:
  // - See the explanation of why we use Effect Hook in the Masthead.js component.
  // - Let's create an effect that show the info only if there is at least on item in the cart:
  // - The info div starts as display:none and the adding or removing itens toggles this value.
  const userSignedMessage = "Sua conta";
  const userNotSignedMessage = "Entrar";
  useEffect(() => {
    document.addEventListener("snipcart.ready", function () {
      const divSnipcartAccountButton = document.getElementById(
        styles.account_button
      );
      // The subscribe method triggers a callback every time an action is dispatched:
      Snipcart.store.subscribe(() => {
        const customer = Snipcart.store.getState().customer;
        if (customer.status === "SignedIn") {
          divSnipcartAccountButton.innerHTML = userSignedMessage;
        } else {
          divSnipcartAccountButton.innerHTML = userNotSignedMessage;
        }
      });
    });
  }, []);

  return (
    <div id={styles.account_button} className="snipcart-customer-signin">
      {userNotSignedMessage}
    </div>
  );
}
