import { ref } from "vue";
import * as bps from "../bpsclient";

export function useCustomer() {
  const cardID = ref(localStorage.getItem("cardID"));

  // Create and configure the API client
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);
  const customer = ref(null);

  // Authenticate once and store authentication state
  const authenticateClient = async () => {
    const hash = await computeHash(cardID.value);
    client.authentications["BasicAuth"].username = cardID.value;
    client.authentications["BasicAuth"].password = hash;
  };

  const getCustomer = async () => {
    // Authenticate once
    await authenticateClient();

    // Fetch customer data
    if (!cardID.value) {
      console.error("No card ID set");
      return null;
    }
    api.getCustomer(cardID.value, (error, data) => {
      if (error) {
        console.error("Error fetching customer", error);
        return null;
      }
      customer.value=data;
    });
  };

  const topUp = async (card_id, amount, details) => {
    // Ensure client is authenticated before making the API call
    await authenticateClient();

    const topUpBody = {
      card_id: card_id,
      amount: amount,
      bill_nr: "1234",
      paypal_details: details,
    };

    api.topupCredit(topUpBody, (error, data) => {
      if (error) {
        console.error("Error topping up", error);
        return;
      }
      balance.value = data.credit;
    });
  };

  const computeHash = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  return {
    customer,
    getCustomer,
    topUp,
  };
}
