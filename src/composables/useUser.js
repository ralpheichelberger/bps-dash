import { ref } from "vue";
import { useAuth } from "./useAuth.js";

const { api, updateAuth } = useAuth();

export function useUser() {
  const user = ref(null);
  const customer = ref(null);
  const getUser = async (card_id) => {
    return new Promise((resolve, reject) => {
      user.value = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      if (user.value && !card_id) {
        resolve(user.value);
        return
      }
      if (!user.value && card_id) {
        updateAuth(card_id)
        api.getUser(card_id, (error, data) => {
          if (error) {
            reject(error);
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            resolve(data);
          }
        });
      } else if (user.value && user.value.typ === "admin") {
        if (card_id && card_id !== user.value.id) {
          api.getUser(card_id, (error, data) => {
            if (error) {
              reject(error);
            } else {
              customer.value = data
            }
            resolve(user.value);
          });
        } else {
          resolve(user.value);
        }
      } else if (user.value) {
        resolve(user.value);
      }
    });
  };


  const reloadUser = (user) => {
    return new Promise((resolve, reject) => {
      api.getUser(user.value.id, (error, data) => {
        if (error) {
          reject(error);
        } else {
          user.value = data;
          localStorage.setItem("user", JSON.stringify(data));
          resolve(user.value);
        }
      });
    });
  }

  const resetUser = (u) => {
    return new Promise((resolve, reject) => {
      u.token = null;
      api.updateUser(u, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  const updateUser = (u) => {
    return new Promise((resolve, reject) => {
      api.updateUser(u, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }


  return {
    customer,
    getUser,
    resetUser,
    reloadUser,
    updateUser,
  };
}
