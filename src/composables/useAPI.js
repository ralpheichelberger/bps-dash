import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { authenticateClient, api, cardID } = useAuth();

export function useAPI() {
  const customer = ref(null);

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
      customer.value = data;
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

  const deviceInfo = ref(null);
  const getDeviceInfo = async (deviceId) => {
    // Authenticate once
    await authenticateClient();

    // Fetch customer data
    if (!cardID.value) {
      console.error("No card ID set");
      return null;
    }
    api.getDeviceInfo(deviceId, (error, data) => {
      if (error) {
        console.error("Error fetching customer", error);
        return null;
      }
      deviceInfo.value = data;
    });
  };

  const allowStart = () => {
    api.allowStart(
      `${deviceInfo.value.name}`,
      `${deviceInfo.value.duration}`,
      (error, data, response) => {
        if (error) {
          console.error("allowStart", error);
          return;
        }
        console.log("allowStart", response);
      }
    );
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

  const cent2euro = (val) => (val / 100).toFixed(2);

  return {
    customer,
    deviceInfo,
    locations,
    priceLines,
    getLocations,
    getCustomer,
    getDeviceInfo,
    getPriceLines,
    topUp,
    allowStart,
    cent2euro,
  };
}
