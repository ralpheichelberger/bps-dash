<template> <!-- FIXME add AGBs -->
  <div v-if="user" class="container bubble_style" :class="{ admin: admin }"
    :style="'height:' + windowInnerHeight + 'px'">
    <div class="user">
      <div v-if="admin" class="admin-config">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
          Config
        </v-btn>
      </div>
      <div :class="{ userName: !admin, adminUser: admin }">
        {{ admin ? "Admin" : "Konto" }} <br />
        <p style="font-size:1.5rem"> {{ user.name }} </p>
        <p v-if="user.typ == 'admin'">Admin</p>
      </div>
      <div v-if="!admin" class="text">
        Guthaben EUR
      </div>
      <div v-if="!admin" class="balance">
        {{ cent2euro(user.credit) }}
      </div>
      <div v-if="!admin" class="card-id">
        ID: {{ user.id }}
      </div>
      <div v-if="!admin" class="topUpButton">
        <v-btn @click="topUpDialog = true" size="large" elevation="5" variant="outlined">
          Aufladen
        </v-btn>
      </div>
    </div>

    <div v-if="deviceInfo" class="maschineName">
      {{ deviceDisplayName() }} <br /> NR. {{ deviceNr() }}
    </div>
    <div v-if="deviceInfo" class="shopAddress">
      {{ deviceInfo.location }}
    </div>
    <div v-if="deviceInfo" class="price">
      Preis: EUR {{ cent2euro(deviceInfo.price) }} {{ deviceInfo.type == 'dryer' ? '/ ' + dryUnits + 'min' : '' }}
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'dryer'" class="calcPrice">
      EUR {{ cent2euro(deviceInfo.price * dryTime / dryUnits) }}
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'washer'" class="selection">
      <div class="detergent">
        <label>Waschmittel</label>
        <TriState v-model="detergent" :onlyOff="!deviceInfo.detergent" />
      </div>
      <div style="width: 1rem;"></div>
      <div class="softener">
        <label>Weichspüler</label>
        <TriState v-model="softener" :onlyOff="!deviceInfo.softener" />
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


    <div v-if="!payed && !admin && (choosen || (deviceInfo && deviceInfo.type == 'dryer'))" class="payPalButton">
      <PayPalButton :amount="paymentAmount" :user-id="user.id" @transactionApproved="payDeviceAndAllowStart" />
    </div>
    <div v-if="!choosen && deviceInfo && deviceInfo.type == 'washer'" class="payPalButton" style="text-align: center;">
      <h3>Bitte wählen Sie Waschmittel und Weichspüler</h3>
    </div>
    <div v-if="!payed" class="creditButton">
      <v-btn elevation="10" height="6rem" width="100%" style="font-size: x-large;"
        @click="payDeviceAndAllowStart(admin ? 'admin' : 'credit')"
        :disabled="!choosen && (deviceInfo && deviceInfo.type == 'washer')">
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
const dryUnits = 10;
const { user, getUser, cent2euro } = useAPI();
const { cardID } = useAuth();
const { deviceInfo, getDeviceInfo } = useDevices();
const { topUp, payment } = usePayment();

const errorDialog = ref(false);
setTimeout(() => {
  errorDialog.value = !user.value || !deviceInfo.value
}, 3000);
const windowInnerHeight = ref(window.innerHeight);
window.addEventListener('resize', updateListHeight);
function updateListHeight() {
  windowInnerHeight.value = window.innerHeight;
}

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

const deviceNr = () => {
  if (deviceInfo.value) {
    return deviceInfo.value.name.split("/")[2];
  }
  return "?";
};
// Returns a label for the device depending on its name.
const deviceDisplayName = () => {
  if (deviceInfo.value) {
    var sname = deviceInfo.value.name.split("/");
    var t = sname[1].substring(0, 1).toUpperCase();
    switch (t) {
      case "W":
        return "Waschmaschine"
      case "D":
        return "Trockner"
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
  const machine_id = parseInt(props.deviceId, 10);
  payment(user.value.id, deviceInfo.value.name, deviceInfo.value.price, machine_id, dryTime.value, typ, details).then(() => {
    getUser(cardID.value).then((dbUser) => {
      localStorage.setItem("user", JSON.stringify(dbUser))
      user.value = dbUser;
    })
    payed.value = true;
  }).catch((error) => {
    errorMessage.value = "Die Zahlung konnte nicht abgeschlossen werden"
    errorDetail.value = error;
    errorDialog.value = true;
  });
};



</script>

<style>
@import './PayDevice.css';

:root {
  --v-theme-surface: rgba(32, 193, 43, 0.6);
}
</style>
