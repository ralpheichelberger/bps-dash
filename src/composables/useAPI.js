import { ref } from "vue";
import { useAuth } from "./useAuth.js";
import { tr } from "vuetify/locale";

const { authenticateClient, api, cardID } = useAuth();

export function useAPI() {
  const customer = ref(null);

  const getCustomer = async (card_id) => {
    // Authenticate once
    await authenticateClient(card_id);
    return new Promise((resolve, reject) => {
      // Fetch customer data
      if (!card_id) {
        reject(new Error("No card ID set"));
      }
      api.getCustomer(cardID.value, (error, data) => {
        if (error) {
          console.error("Error fetching customer", error);
          if (error.status === 401) {
            console.error("Unauthorized");
            // remove customer data from local storage
            if (localStorage.getItem("customer")) {
              localStorage.removeItem("customer");
              getCustomer(card_id)
            }
          } else reject(new Error("Error fetching customer: " + error));
        } else {
          customer.value = data;
          // store customer data in local storage
          localStorage.setItem("customer", JSON.stringify(data));
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
    locations,
    priceLines,
    newPriceLine,
    getLocations,
    getCustomer,
    getPriceLines,
    cent2euro,
    uploadModuleProgramm,
  };
}
