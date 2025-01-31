import { ref } from "vue";
import * as bps from "../bpsclient";

/** useAuth
 * returns {init function, api bps.DefaultApi, cardID ref}
 */
export function useAuth() {
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);

  const updateAuth = (card_id) => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    let token = card_id ? card_id : import.meta.env.VITE_ACCESS_TOKEN
    if (userLocal) {
      token = userLocal.token;
    }
    client.authentications["BearerAuth"].accessToken = token
  }

  updateAuth();

  return {
    api,
    updateAuth,
  };
}
