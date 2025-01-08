import { ref } from "vue";
import * as bps from "../bpsclient";

/** useAuth
 * returns {init function, api bps.DefaultApi, cardID ref}
 */
export function useAuth() {
  const u = ref(localStorage.getItem("user") || ""); 
  if (u.value) {
    cardID.value = JSON.parse(u.value).id
  }
  // Create and configure the API client
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);


  const authenticateClient = async (card_id) => {
    // Set the card ID
    if (card_id) {
      cardID.value = card_id
    }
    var token=card_id
    const userLocal=localStorage.getItem("user");
    if (userLocal) {
      let data = JSON.parse(userLocal);
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
