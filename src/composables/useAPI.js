import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { api, upDateAuth } = useAuth();

export function useAPI() {

  const getMarketing = async (code, uuid) => {
    return new Promise((resolve, reject) => {
      api.getMarketing(code, uuid, (error, data) => {
        if (error) {
          reject(new Error("Error fetching marketing: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const saveMarketing = async (marketing) => {
    return new Promise((resolve, reject) => {
      api.newMarketing(marketing, (error, data) => {
        if (error) {
          reject(new Error("Error saving marketing: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const updateMarketing = async (marketing) => {
    return new Promise((resolve, reject) => {
      api.updateMarketing(marketing, (error, data) => {
        if (error) {
          reject(new Error("Error updating marketing: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const locations = ref(null);

  const getLocations = async () => {
    return new Promise((resolve, reject) => {
      api.getLocations((error, data) => {
        if (error) {
          console.error("Error fetching locations", error);
          reject(new Error("Error fetching locations: " + error));
        } else {
          locations.value = data;
          resolve(data);
        }
      });
    });

  }
  const priceLines = ref(null);

  const getPriceLines = async () => {
    api.getPriceLines((error, data) => {
      if (error) {
        console.error("Error fetching priceLines", error);
        return null;
      }
      priceLines.value = data;
    });
  }

  const newPriceLine = async (priceLine) => {
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
    return new Promise((resolve, reject) => {
      api.moduleProgramm(moduleProgramm.typ, moduleProgramm.version, moduleProgramm.file, moduleProgramm.checksum, (error, data) => {
        if (error) {
          reject(new Error("Error uploading module programm: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }



  return {
    locations,
    priceLines,
    newPriceLine,
    getLocations,
    getPriceLines,
    cent2euro,
    uploadModuleProgramm,
    saveMarketing,
    updateMarketing,
    getMarketing,
  };
}
