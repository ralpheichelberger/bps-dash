import { ref } from "vue";
import * as bps from "../bpsclient";

/** useAuth
 * returns {init function, api bps.DefaultApi, cardID ref}
 */
export function useAuth() {
  const cardID = ref(localStorage.getItem("cardID"));

  // Create and configure the API client
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);


  // Authenticate once and store authentication state
  const authenticateClient = async () => {
    const hash = await computeHash(cardID.value);
    client.authentications["BasicAuth"].username = cardID.value;
    client.authentications["BasicAuth"].password = hash;
  };


  const computeHash = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  return {
    authenticateClient,
    api,
    cardID,
  };
}
