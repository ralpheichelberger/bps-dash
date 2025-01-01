import { ref } from "vue";
import * as bps from "../bpsclient";

/** useAuth
 * returns {init function, api bps.DefaultApi, cardID ref}
 */
export function useAuth() {
  const cardID = ref("");
  // Create and configure the API client
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);


  // Authenticate once and store authentication state
  const authenticateClient = async (card_id) => {
    cardID.value=localStorage.getItem("cardID");
    if (card_id) {
      cardID.value = card_id;
      localStorage.setItem("cardID", card_id)
    }
    let salt= "";
    const customerData = localStorage.getItem("customer");
    if (customerData) { 
      let data = JSON.parse(customerData);
salt = data.salt;
     }
    const hash = await hashUsernameWithSalt(cardID.value, salt);
    client.authentications["BasicAuth"].username = cardID.value;
    client.authentications["BasicAuth"].password = hash;
  };

  async function hashUsernameWithSalt(username, salt) {
    const input = username + salt;
    console.log(input);
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}



  return {
    authenticateClient,
    api,
    cardID,
  };
}
