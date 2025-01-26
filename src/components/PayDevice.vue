<template> <!-- FIXME add AGBs -->
  <div v-if="user" class="container bubble_style" :class="{ admin: admin }">
    <div class="user">
      <div class="userName">
        Konto {{ user.name }}
        <h2 v-if="user.typ == 'admin'">Admin</h2>
      </div>
      <div v-if="!admin" class="balance">
        Guthaben EUR {{ cent2euro(user.credit) }}
      </div>
      <div v-if="!admin" class="card-id">
        ID: {{ user.id }}
      </div>
      <div v-if="!admin" class="topUpButton">
        <v-btn @click="topUpDialog = true" size="x-large" elevation="5" variant="outlined">
          Aufladen
        </v-btn>
      </div>
    </div>
    <div v-if="admin" class="topUpButton">
      <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
        Config
      </v-btn>
    </div>
    <div class="maschineName">
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'washer'" class="selection">
      <div class="detergent">
        <label>Waschmittel:</label>
        <v-radio-group v-model="detergent" mandatory>
          <v-radio :disabled="!deviceInfo.detergent" label="On" value="on"></v-radio>
          <v-radio label="Off" value="off"></v-radio>
        </v-radio-group>
      </div>
      <div class="softener">
        <label>Weichspüler:</label>
        <v-radio-group v-model="softener" mandatory>
          <v-radio :disabled="!deviceInfo.softener" label="On" value="on"></v-radio>
          <v-radio label="Off" value="off"></v-radio>
        </v-radio-group>
      </div>
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'dryer'" class="selection">
      <div class="dry-time-container">
        <h4 class="dry-time-title">Trockenzeit Minuten</h4>
        <v-btn class="dry-time-minus" @click="dryTime = Math.max(10, dryTime - 10)" icon>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <h1 class="dry-time">{{ dryTime }}</h1>
        <v-btn class="dry-time-plus" @click="dryTime = Math.min(60, dryTime + 10)" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="deviceInfo" class="shopAddress">
      <h3>{{ deviceDisplayName() }}</h3>
      {{ deviceInfo.location }}
      <!-- {{ deviceInfo }} -->
    </div>
    <div v-if="deviceInfo" class="price">
      Preis: EUR {{ cent2euro(deviceInfo.price) }}
    </div>
    <div v-if="!payed && !admin && (choosen || (deviceInfo && deviceInfo.type=='dryer'))" class="payPalButton" >
      <PayPalButton :amount="paymentAmount" :user-id="user.id" @transactionApproved="payDeviceAndAllowStart" />
    </div>
    <div v-if="!choosen && deviceInfo && deviceInfo.type == 'washer'" class="payPalButton" style="text-align: center;">
      <h3>Bitte wählen Sie Waschmittel und Weichspüler</h3>
    </div>
    <div v-if="!payed" class="creditButton">
      <v-btn elevation="10" height="6rem" width="100%" style="font-size: x-large;"
        @click="payDeviceAndAllowStart('credit')" :disabled="!choosen && (deviceInfo && deviceInfo.type == 'washer')">
        {{ admin ? "Freischalten" : "Mit Guthaben zahlen" }}
      </v-btn>
    </div>
    <div v-if="payed" class="payPalButton" style="text-align: center;">
      <h1>Maschine ist {{ admin ? "freigeschalten" : "bezahlt" }}</h1>
    </div>
  </div>
  <v-dialog v-if="user" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :user-id="user.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>

  <v-dialog v-model="errorDialog" class="ma-3" elevation="10">
    <v-card class="bubble_style">
      <v-card-title style="font-size: 5rem">
        Sorry :(
      </v-card-title>
      <v-card-text style="font-size: x-large;">
        {{ errorMessage }}
        <br />Bitte wenden Sie sich an unseren Kundenservice!
        <br />
        <v-expansion-panels>
          <v-expansion-panel style="font-family: 'Courier New', Courier, monospace; font-size: small;" title="Details"
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

</template>

<script setup>
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI";
import { useDevices } from "../composables/useDevices";
import { usePayment } from "../composables/usePayment";
import TopUp from "./TopUp.vue";
import { useAuth } from "../composables/useAuth";

const topUpDialog = ref(false);
const errorDetail = ref("");
const errorMessage = ref("");
const payed = ref(false);
const dryTime = ref(20);

const { user, getUser, cent2euro } = useAPI();
const { cardID } = useAuth();
const { deviceInfo, getDeviceInfo } = useDevices();
const { topUp, payment } = usePayment();

const errorDialog = ref(false);
setTimeout(() => {
  errorDialog.value = !user.value || !deviceInfo.value
}, 3000);



getUser(cardID.value).then((dbUser) => {
  localStorage.setItem("user", JSON.stringify(dbUser))
}).catch((error) => {
  if (error.response.status == 401) {
    errorDialog.value = true;
    errorMessage.value = "Kundenkonto gesperrt.";
    errorDetail.value = "Bitte scannen Sie eine andere Bubble Card oder wenden Sie sich an unseren Kundenservice!";
  }
});
const admin = computed(() => {
  if (user.value) {
    return user.value.typ == "admin";
  }
  return false;
})
const choosen = computed(() => {
  return detergent.value != null && softener.value != null
});
const navigateToAdmin = () => {
  window.location.href = "/admin";
}
const topUpCredit = (topAmount, details) => {
  topUp(user.value.id, topAmount, details).then(() => {
    getUser(user.value.id)
  })
  topUpDialog.value = false
}
const props = defineProps(["deviceId"]);
getDeviceInfo(props.deviceId).catch((error) => {
  errorMessage.value = "Dieses Gerät ist leider nicht registriert"
  errorDetail.value = error;
});

// Closes error dialog and redirects back to the homepage.
const closeError = () => {
  errorDialog.value = false;
  window.location.href = "/";
};

// Returns a label for the device depending on its name.
const deviceDisplayName = () => {
  if (deviceInfo.value) {
    var sname = deviceInfo.value.name.split("/");
    var t = sname[1].substring(0, 1).toUpperCase();
    switch (t) {
      case "W":
        return "Waschmaschine Nr. " + sname[2]
      case "D":
        return "Trockner Nr. " + sname[2]
      default:
        return deviceInfo.value.name;
    }
  }
};

// Computes the payment amount in euros for PayPal.
const paymentAmount = computed(() => {
  if (deviceInfo.value) {
    return cent2euro(deviceInfo.value.price).toString();
  }
  return "0";
});
const detergent = ref(null);
const softener = ref(null);

// Handles payment logic and allows the device to start.
const payDeviceAndAllowStart = (typ, details) => {
  // FIXME send selected detergent and softener to the server
  if (deviceInfo.value.type == 'washer') {
    dryTime.value = 0;
  }
  payment(user.value.id, deviceInfo.value.name, deviceInfo.value.price, props.deviceId, dryTime.value, typ, details).then(() => {
    // allowStart(deviceInfo.value.name, deviceInfo.value.impuls_duration);
    getUser(); // update user balance
    payed.value = true;
  }).catch((error) => {
    errorMessage.value = "Die Zahlung konnte nicht abgeschlossen werden"
    errorDetail.value = error;
    errorDialog.value = true;
  });
};



</script>

<style>
.container {
  height: 100vh;
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr 2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "userName balance"
    "card-id topUpButton"
    "shopAddress price"
    "maschineName ."
    "detergent softener"
    "payPalButton payPalButton"
    "creditButton creditButton";
}

@keyframes myFadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.userName {
  padding-left: var(--user-padding-left);
  grid-area: userName;
}

.balance {
  grid-area: balance;
  text-align: right;
  padding-right: var(--user-padding-right);
}

.card-id {
  padding-left: var(--user-padding-left);
  grid-area: card-id;
}

.topUpButton {
  grid-area: topUpButton;
  text-align: right;
  padding-right: var(--user-padding-right);

}

.maschineName {
  grid-area: maschineName;
}

.user {
  grid-row: 1 span 2;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "userName balance"
    "card-id topUpButton";
  border: solid 1px black;
  border-radius: .2rem;
  background-color: rgb(32, 32, 32);
  box-shadow: 0px 5px 10px 3px rgba(72, 72, 72, 0.5);
  padding: 1rem;
  color: white;
}

.selection {
  grid-row: 5;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "detergent softener";
  /* border: solid 1px rgb(106, 106, 106); */
  border-radius: .2rem;
  background-color: rgba(251, 250, 169, 0.179);
  box-shadow: 0px 5px 10px 3px rgba(72, 72, 72, 0.5);
}

.detergent {
  padding-left: 50px;
  grid-area: detergent;
}

.dry-time-container {
  padding: 1rem;
  grid-row: 1;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "title title title"
    "dry-time-minus dry-time dry-time-plus";
}

.dry-time-title {
  grid-area: title;
  text-align: center;
}

.dry-time-minus {
  grid-area: dry-time-minus;
  justify-self: center;
}

.dry-time {
  grid-area: dry-time;
  text-align: center;
}

.dry-time-plus {
  grid-area: dry-time-plus;
  justify-self: center;
}

.softener {
  grid-area: softener;
}

.shopAddress {
  padding-left: 30px;

  grid-area: shopAddress;
}

.price {
  grid-area: price;
  text-align: right;
  margin-top: auto;
  padding-right: var(--user-padding-right);
}

.payPalButton {
  grid-area: payPalButton;
  margin-top: auto;
}

.creditButton {
  grid-area: creditButton;
  margin-top: auto;
}

.error-dialog {
  opacity: 0;
  animation: fadeIn 3s ease-in-out forwards;
  background-color: rgba(0, 0, 0, 0.762);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  80% {
    opacity: 0.0;
  }

  100% {
    opacity: 1;
  }
}
</style>
