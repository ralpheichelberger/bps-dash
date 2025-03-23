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

  const updatePriceLine = async (priceLine) => {
    return new Promise((resolve, reject) => {
      api.updatePriceLine(priceLine, (error, data) => {
        if (error) {
          reject(new Error("Error updating priceLine: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const deletePriceLine = async (priceLine) => {
    return new Promise((resolve, reject) => {
      api.deletePriceLine(priceLine.id, (error, data) => {
        if (error) {
          reject(new Error("Error deleting priceLine: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }



  const cent2euro = (val) => (val / 100).toFixed(2);

  const uploadModuleProgramm = async (moduleProgramm) => {
    return new Promise((resolve, reject) => {
      api.moduleProgramm(moduleProgramm.typ, moduleProgramm.version, moduleProgramm.file, moduleProgramm.checksum, {info:moduleProgramm.info}, (error, data) => {
        if (error) {
          reject(new Error("Error uploading module programm: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const programms = ref([]);
  const getModuleProgramms = async () => {
    return new Promise((resolve, reject) => {
      api.getModuleProgramms((error, data) => {
        if (error) {
          reject(new Error("Error fetching module programms: " + error));
        } else {
          programms.value = data;
          resolve(data);
        }
      });
    });
  }
  const getModuleProgramm = async (typ, version) => {
    return new Promise((resolve, reject) => {
      api.getModuleProgramm(typ, version, (error, data) => {
        if (error) {
          reject(new Error("Error fetching module programm: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  const deleteModuleProgramm = async (checksum) => {
    return new Promise((resolve, reject) => {
      api.deleteModuleProgramm(checksum, (error, data) => {
        if (error) {
          reject(new Error("Error deleting module programm: " + error));
        } else {
          resolve(data);
        }
      });
    });
  }

  return {
    locations,
    priceLines,
    programms,
    newPriceLine,
    getLocations,
    getPriceLines,
    updatePriceLine,
    deletePriceLine,
    cent2euro,
    uploadModuleProgramm,
    getModuleProgramms,
    deleteModuleProgramm,
    saveMarketing,
    updateMarketing,
    getMarketing,
  };
}
