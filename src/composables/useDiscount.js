import { get } from "superagent";
import { useAuth } from "./useAuth.js";
import { ref } from "vue";
const { api, upDateAuth } = useAuth();

export function useDiscount() {

  const discounts = ref(null);

  const getDiscounts = async () => {
    return new Promise((resolve, reject) => {
      api.discounts((error, data) => {
        if (error) {
          reject(new Error("Error fetching discounts: " + error));
        } else {
          discounts.value = data;
          resolve(data);
        }
      });
    });
  }

  const newDiscount = async (discount) => {
    return new Promise((resolve, reject) => {
      api.newDiscount(discount, (error, data) => {
        if (error) {
          reject(new Error("Error creating discount: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }
  const updateDiscount = async (discount) => {
    return new Promise((resolve, reject) => {
      api.updateDiscount(discount, (error, data) => {
        if (error) {
          reject(new Error("Error updating discount: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }
  const deleteDiscount = async (discount) => {
    return new Promise((resolve, reject) => {
      api.deleteDiscount(discount.id, (error, data) => {
        if (error) {
          reject(new Error("Error deleting discount: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }
  const getDiscount = async (id) => {
    return new Promise((resolve, reject) => {
      api.getDiscount(id, (error, data) => {
        if (error) {
          reject(new Error("Error fetching discount: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const getDiscountByCode = async (code) => {
    return new Promise((resolve, reject) => {
      api.getDiscountByCode(code, (error, data) => {
        if (error) {
          reject(new Error("Error fetching discount: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const getMarketings = async (uuid) => {
    return new Promise((resolve, reject) => {
      api.getMarketings(uuid, (error, data) => {
        if (error) {
          reject(new Error("Error fetching marketing code: " + error));
        } else {
          resolve(data)
        }
      });
    });
  }

  const updateMarketing = async (marketing) => {
    return new Promise((resolve, reject) => {
      api.updateMarketing(marketing, (error, data) => {
        if (error) {
          reject(new Error("Error updating marketing code: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  return {
    discounts,
    getDiscounts,
    getDiscount,
    getDiscountByCode,
    newDiscount,
    updateDiscount,
    deleteDiscount,
    getMarketings,
    updateMarketing,
  };
}
