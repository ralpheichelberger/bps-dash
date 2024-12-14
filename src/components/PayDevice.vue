<template>
  <v-card v-if="customer">
    <v-card-title>
      <v-row style="padding-bottom: 0">
        <v-col>Konto {{ customer.name }} </v-col>
        <v-col></v-col>
        <v-col>Guthaben EUR {{ balance }}</v-col>
      </v-row>
      <v-row style="padding-top: 0">
        <v-col
          ><small
            ><small>ID: {{ customer.id }}</small></small
          ></v-col
        >
        <v-col></v-col>
        <v-col style="padding-top: 0">
          <v-btn @click="topUpDialog" size="x-large" elevation="5">Aufladen</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="device">
      <v-row><v-col></v-col></v-row>
      <v-row
        ><v-col>{{ device.shop }}</v-col></v-row
      >
      <v-row
        ><v-col>{{ device.type }} {{ device._number }}</v-col></v-row
      >
      <v-row
        ><v-col>EUR {{ cent2euro(device.price) }}</v-col></v-row
      >
      <v-row justify="center">
        <v-col>
          <v-btn @click="allowStart">Mit Guthaben zahlen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PayPalButton
            :clientId="payPalClientId"
            :amount="cent2euro(device.price)"
            :customerId="cardID"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog">
      <TopUp :visible="dialog" :cardID="cardID" @close="dialog = false" @topup="topUp" />
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useCustomer } from "../composables/useCustomer";
import * as bps from "../bpsclient";
import PayPalButton from "./PayPalButton.vue";
const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const { cardID, customer, balance, initializeCustomer } = useCustomer();

const deviceID = ref(new URLSearchParams(window.location.search).get("d"));
const device = ref({
  shop: "BX",
  type: "washer",
  nr: "3",
  price: 400,
  duration: 100,
});

const dialog = ref(false);

initializeCustomer();
const cent2euro = (val) => (val / 100).toFixed(2);

const allowStart = () => {
  const client = new bps.ApiClient();
  const api = new bps.DefaultApi(client);

  api.allowStart(
    `${deviceID.value}`,
    `${device.value.duration}`,
    (error, data, response) => {
      if (error) {
        console.error("allowStart", error);
        return;
      }
      console.log("allowStart", response);
    }
  );
};

const topUpDialog = () => {
  dialog.value = true;
};
const topUp = (amount) => {
  console.log("topUp", amount);
  dialog.value = false;
};
</script>

<style scoped>
:root {
  --background-gradient: linear-gradient(
    135deg,
    #ff9a8b,
    #ff6a88,
    #ff99ac,
    #ffd6a5,
    #c1f7d5,
    #a2e3f7,
    #a1c4fd
  );
}

.bubble_background {
  background: var(--background-gradient);
  color: black;
  height: 7rem;
  font-family: "DreamingOutloud", Arial, sans-serif;
}

@font-face {
  font-family: "DreamingOutloud";
  src: url("@/assets/bubblekassa.otf") format("opentype");
}

.bubble-font {
  font-family: "DreamingOutloud", Arial, sans-serif;
}

.v-card {
  font-family: "DreamingOutloud", Arial, sans-serif;
  background: var(--background-gradient);
  color: black;
  height: 100vh;
}
</style>
