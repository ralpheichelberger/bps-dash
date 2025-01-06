import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { authenticateClient, api, cardID } = useAuth();

export function useAPI() {
  const user = ref(null);
  const customer = ref(null);
  const getUser = async (card_id) => {
    // Authenticate once
    await authenticateClient(card_id);
    return new Promise((resolve, reject) => {

      api.getUser(cardID.value, (error, data) => {
        if (error) {
          console.error("Error fetching user", error);
          if (error.status === 401) {
            console.error("Unauthorized");
            // remove user data from local storage
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
              getUser(card_id)
            }
          } else reject(new Error("Error fetching user: " + error));
        } else {
          // store user data in local storage
          if (localStorage.getItem("user")) {
            user.value = JSON.parse(localStorage.getItem("user"));
            if (user.value.typ === "admin" && data.typ === "customer") {
              customer.value = data
            }
          } else {
            user.value = data;
            localStorage.setItem("user", JSON.stringify(data));
          }
          resolve(data);
        }
      });
    });
  };


  const locations = ref(null);

  const getLocations = async () => {
    // Authenticate once
    await authenticateClient();

    api.getLocations((error, data) => {
      if (error) {
        console.error("Error fetching locations", error);
        return null;
      }
      locations.value = data;
    });
  }
  const priceLines = ref(null);

  const getPriceLines = async () => {
    // Authenticate once
    await authenticateClient();

    api.getPriceLines((error, data) => {
      if (error) {
        console.error("Error fetching priceLines", error);
        return null;
      }
      priceLines.value = data;
    });
  }

  const newPriceLine = async (priceLine) => {
    await authenticateClient();
    return new Promise((resolve, reject) => {
      api.newPriceLine(priceLine, (error, data) => {
        if (error) {
          reject(new Error("Error creating priceLine: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const cent2euro = (val) => (val / 100).toFixed(2);

  const uploadModuleProgramm = async (moduleProgramm) => {
    await authenticateClient();
    return new Promise((resolve, reject) => {
      api.moduleProgramm(moduleProgramm.typ, moduleProgramm.version, moduleProgramm.file, (error, data) => {
        if (error) {
          reject(new Error("Error uploading module programm: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }


  return {
    customer,
    user,
    locations,
    priceLines,
    newPriceLine,
    getLocations,
    getUser,
    getPriceLines,
    cent2euro,
    uploadModuleProgramm,
  };
}
