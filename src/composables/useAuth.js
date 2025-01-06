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


  const authenticateClient = async (card_id) => {
    // Set the card ID
    cardID.value = card_id
    var token=card_id
    const customerLocal=localStorage.getItem("customer");
    if (customerLocal) {
      let data = JSON.parse(customerLocal);
      token = data.token;
    }
    client.authentications["BearerAuth"].accessToken = token
  };

  return {
    authenticateClient,
    api,
    cardID,
  };
}
