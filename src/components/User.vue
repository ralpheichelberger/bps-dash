<template>
  <!-- TODO add AGBs -->
  <div v-if="user" class="container bubble_style" :class="{ admin: admin }"
    :style="'height:' + windowInnerHeight + 'px'">
    <div class="bcard user">
      <div v-if="admin" class="adminConfig">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined" @mousedown="startPress"
          @mouseup="cancelPress" @mouseleave="cancelPress" @touchstart="startPress" @touchend="cancelPress">
          Config
        </v-btn>
      </div>
      <div :class="{ userName: !admin, adminUser: admin }">
        Konto <br />
        <p style="font-size: 1.5rem">{{ user.name }}</p>
        <p v-if="user.typ == 'admin'">Admin</p>
      </div>
      <div v-if="!admin" class="text">Guthaben EUR</div>
      <div v-if="!admin" :class="['balance', { 'glowing-text': triggerGlow }]" ref="balanceRef">
        {{ cent2euro(user.credit) }}
      </div>
      <div v-if="!admin" class="card-id">ID: {{ user.id }}</div>
      <div v-if="!admin" class="topUpButton">
        <v-btn @click="topUpDialog = true" size="large" elevation="5" variant="outlined" @mousedown="startPress"
          @mouseup="cancelPress" @mouseleave="cancelPress" @touchstart="startPress" @touchend="cancelPress">
          Aufladen
        </v-btn>
      </div>
    </div>
    <div v-if="userPayments" class="bcard payments">
      <v-table :height="windowInnerHeight - 180 + 'px'" width="100%" fixed-header>
        <thead>
          <tr>
            <th>Zeit</th>
            <th>Betrag</th>
            <th>Gerät</th>
            <th>Typ</th>
            <!-- <th>Rechnung</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userPayments" :key="item.timestamp">
            <td>{{ toDateTime(item.timestamp) }}</td>
            <td>{{ centToEuro(item.amount) }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.typ }}</td>
            <!-- <td>{{ item.bill_nr }}</td> -->
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="footer-version">{{ APP_VERSION }}</div>
  </div>
  <v-dialog v-if="user" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :user-id="user.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>
  <v-dialog v-if="customer" v-model="customerDialog">
    <v-card class="bubble_style customer pa-4" elevation="4">
      <v-card-title class="headline">Customer Details
        <v-btn style="float:right" icon="mdi-close" @click="customer = null"></v-btn>

        <v-card-subtitle>ID: {{ customer.id }} </v-card-subtitle>
      </v-card-title>
      <!-- <v-card-text> -->
      <v-table class="customerData" density="compact">
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td><v-text-field v-model="customer.name" density="compact" @blur="saveCustomer">
              </v-text-field></td>
          </tr>
          <tr>
            <td><strong>Balance:</strong></td>
            <td>{{ cent2euro(customer.credit) }}</td>
          </tr>
          <tr>
            <td><strong>Rabatte</strong></td>
            <td>{{ discountArray }}</td>
          </tr>
          <tr>
            <td><strong>Type:</strong></td>
            <td>{{ customer.typ }}</td>
          </tr>
          <tr>
            <td><strong>Active:</strong></td>
            <td>
              <v-switch v-model="customer.active" :color="'green'" @update:modelValue="saveCustomer"></v-switch>
            </td>
          </tr>

        </tbody>
      </v-table>
      <v-divider></v-divider>
      <v-dialog v-model="discountsDialog" class="ma-3" elevation="10">
        <!--list of all discounts with a check box right if  the customer has it attached-->
        <v-table>
          <thead>
            <tr>
              <th>Discounts</th>
              <th class="text-right">Percentage</th>
              <th>Attached</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="discount in discounts" :key="discount">
              <td>{{ discount.name }}</td>
              <td class="text-right">{{ discount.percentage }}</td>
              <td><v-checkbox v-model="customer.discounts" :value="discount.id" @update:modelValue="saveCustomer">
                </v-checkbox></td>
            </tr>
          </tbody>
        </v-table>
      </v-dialog>
      <v-row>
        <v-col>
          <v-text-field v-model.number="customerTopupAmount">EUR</v-text-field>
        </v-col>
        <v-col>
          <v-radio-group v-model="customerTopupType" class="ma-2">
            <v-radio label="Admin" value="admin"></v-radio>
            <v-radio label="Bar" value="cash"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <!-- </v-card-text> -->

      <v-card-actions>
        <v-btn elevation="4" color="#800" dark @click="resetCustomer">Reset</v-btn>
        <!-- <v-btn elevation="4" color="#505" dark @click="toggleActiveCustomer">{{ customer.active ? 'deactivate' :
          'activate' }} </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn elevation="4" color="#050" dark @click="openRabatte">Discounts</v-btn>
        <v-btn elevation="4" color="#050" dark @click="topUpCustomerCredit" :disabled="customerTopupAmount == 0 ||
          (customerTopupType == 'cash' && customerTopupAmount < 0)"> Aufladen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="errorDialog" class="ma-3" elevation="10">
    <v-card class="bubble_style">
      <v-card-title style="font-size: 5rem"> Sorry :( </v-card-title>
      <v-card-text style="font-size: x-large">
        {{ errorMessage }}
        <br />Bitte wenden Sie sich an unseren Kundenservice!
        <br />
        <v-expansion-panels>
          <v-expansion-panel style="font-family: 'Courier New', Courier, monospace; font-size: small" title="Details"
            :text="errorDetail">
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" elevation="5" style="font-size: 1.5rem" @click="closeError">
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color">
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useAPI } from "../composables/useAPI";
import { useUser } from "../composables/useUser";
import TopUp from "./TopUp.vue";
import { usePayment } from "../composables/usePayment";
import { useLongPress } from "../composables/useLongPress";
import { useDiscount } from "../composables/useDiscount";

const snackbar = ref({ color: "success", text: "gespeichert", show: false });
const APP_VERSION = window.APP_VERSION ? window.APP_VERSION : "0.0.0";

const { startPress, cancelPress } = useLongPress();
const user = ref(null);
const topUpDialog = ref(false);
const discountsDialog = ref(false);
const customerDialog = computed(() => (customer.value ? true : false));
const errorDetail = ref("");
const errorMessage = ref("");
const userPayments = ref([]);
const customerTopupAmount = ref(0);
const customerTopupType = ref("admin");

const { customer, getUser, resetUser, reloadUser, updateUser } = useUser();
const { discounts, getDiscounts } = useDiscount();
const { cent2euro } = useAPI();
const { topUp, payments } = usePayment();
const props = defineProps(["id"]);
const errorDialog = ref(false);
const windowInnerHeight = ref(window.innerHeight);
window.addEventListener("resize", updateListHeight);
function updateListHeight() {
  windowInnerHeight.value = window.innerHeight;
}
window.addEventListener('beforeunload', () => {
  // This prevents the page from being cached in bfcache
});

const discountArray = computed(() => {
  if (customer.value && customer.value.discounts) {
    return customer.value.discounts.join(", ")
  }
  return "keine";
});

const openRabatte = () => {
  discountsDialog.value = true;
};

setTimeout(() => {
  errorDialog.value = !user.value;
}, 3000);
const saveCustomer = () => {
  updateUser(customer.value);
};
getUser(props.id)
  .then((dbUser) => {
    localStorage.setItem("user", JSON.stringify(dbUser));
    user.value = dbUser;
    if (user.value) {
      if (user.value.typ=='admin') getDiscounts();
      payments(user.value.id)
      .then((data) => {
        userPayments.value = data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status == 401) {
          errorUnauthorized();
        }
      });
    }
  })
  .catch((error) => {
    if (error.response && error.response.status == 401) {
      errorUnauthorized();
    }
  });
  const errorUnauthorized = () => {
  localStorage.removeItem("user");
  errorDialog.value = true;
  errorMessage.value = "Kundenkonto gesperrt.";
  errorDetail.value =
    "Bitte scannen Sie eine andere Bubble Card oder wenden Sie sich an unseren Kundenservice!";
};

const admin = computed(() => {
  if (user.value) {
    return user.value.typ == "admin";
  }
  return false;
});

const navigateToAdmin = () => {
  window.location.href = "/admin";
};

const triggerGlow = ref(false);
const balanceRef = ref(null);

const glow = () => {
  triggerGlow.value = false;
  nextTick(() => {
    void balanceRef.value.offsetWidth; // Force reflow to restart animation
    triggerGlow.value = true;
  });
  setTimeout(() => {
    triggerGlow.value = false;
  }, 3000); // Match with animation duration
};

const topUpCredit = (topAmount, details) => {
  topUp(user.value.id, topAmount, details, "topup").then(() => {
    // wait for the transaction to be processed
    setTimeout(reloadUser(user).then((u) => {
      user.value = u;
      setTimeout(glow(), 300)
    }), 1000);
    payments(user.value.id)
      .then((data) => {
        userPayments.value = data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status == 401) {
          errorUnauthorized();
        }
      });
  });
  topUpDialog.value = false;
};

// Closes error dialog and redirects back to the homepage.
const closeError = () => {
  errorDialog.value = false;
  window.location.href = "/";
};
const toDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};
const centToEuro = (cent) => {
  return (cent / 100).toFixed(2);
};

const toggleActiveCustomer = () => {
  customer.value.active = !customer.value.active;
};

const resetCustomer = () => {
  confirm("Konto wirklich zurücksetzen?") &&
    resetUser(customer.value).then(() => {
      snackbar.value.text = `Bubble Konto ${customer.value.name} erfolgreich zurückgesetzt`;
      snackbar.value.color = "success";
      snackbar.value.show = true;
    });
};

const topUpCustomerCredit = () => {
  topUp(
    customer.value.id,
    customerTopupAmount.value * 100,
    null,
    customerTopupType.value,
    user.value.id
  ).then(() => {
    getUser(customer.value.id).then((dbUser) => {
      snackbar.value.text = `EUR ${customerTopupAmount.value} erfolgreich aufgeladen!`;
      snackbar.value.color = "success";
      snackbar.value.show = true;
    });
  });
};

</script>

<style>
@import "./User.css";
</style>
