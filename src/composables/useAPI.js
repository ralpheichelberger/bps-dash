import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { authenticateClient, api, cardID } = useAuth();

export function useAPI() {
  const customer = ref(null);

  const getCustomer = async (card_id) => {
    // Authenticate once
    await authenticateClient(card_id);

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
      customer.value = data;
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
      api.moduleProgramm(moduleProgramm.typ,moduleProgramm.version,moduleProgramm.file, (error, data) => {
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
