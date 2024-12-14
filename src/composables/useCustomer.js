import { ref } from "vue";
import * as bps from "../bpsclient";

export function useCustomer() {
  const cardID = ref(localStorage.getItem("cardID") || "d2gH29R0H");
  const customer = ref(null);
  const balance = ref(0);

  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);

  const initializeCustomer = async () => {
    const hash = await computeHash(cardID.value);
    client.authentications["BasicAuth"].username = cardID.value;
    client.authentications["BasicAuth"].password = hash;

    api.getCustomer(cardID.value, (error, data) => {
      if (error) {
        console.error("Error fetching customer", error);
        return;
      }
      customer.value = data;
      if (customer.value?.credit) {
        balance.value = customer.value.credit;
      }
    });
  };
  const topUp = async (card_id,amount) => {
    const hash = await computeHash(cardID.value);
    client.authentications["BasicAuth"].username = cardID.value;
    client.authentications["BasicAuth"].password = hash;


    const topUpBody = { card_id: card_id, amount: amount, bill_nr: "1234" }
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
    cardID,
    customer,
    balance,
    initializeCustomer,
    topUp,
  };
}
