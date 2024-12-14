<template>
  <v-card v-if="customer" class="bubble_style">
    <v-card-title>
      <v-row style="padding-bottom: 0">
        <v-col>Konto {{ customer.name }} </v-col>
        <v-col></v-col>
        <v-col>Guthaben EUR {{ customer.credit }}</v-col>
      </v-row>
      <v-row style="padding-top: 0">
        <v-col><small><small>ID: {{ customer.id }}</small></small></v-col>
        <v-col></v-col>
        <v-col style="padding-top: 0">
          <v-btn @click="openTopUpDialog" size="x-large" elevation="5">Aufladen</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="device">
      <v-row><v-col></v-col></v-row>
      <v-row><v-col>{{ device.shop }}</v-col></v-row>
      <v-row><v-col>{{ device.type }} {{ device._number }}</v-col></v-row>
      <v-row><v-col>EUR {{ cent2euro(device.price) }}</v-col></v-row>
      

      <v-row justify="center">
        <v-col>
          <v-btn  elevation="10" color="blue" height="8rem" width="100%" @click="openPayPalDialog">Mit PayPal zahlen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn elevation="10"  height="8rem" width="100%"
           @click="allowStart">Mit Guthaben zahlen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="topUpDialog">
      <TopUp :visible="topUpDialog" :customer-id="customer.id" @close="topUpDialog = false"  @top-up="doTopUp" />
    </v-dialog>
    <v-dialog v-model="payPalDialog">
      <PayPalPayment :visible="payPalDialog" :customer-id="customer.id" @close="payPalDialog = false" @pay-device="allowStart" />
    </v-dialog>
    
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useCustomer } from "../composables/useCustomer";
import * as bps from "../bpsclient";
import PayPalPayment from "./PayPalPayment.vue";
const { customer, getCustomer, topUp } = useCustomer();

const deviceID = ref(new URLSearchParams(window.location.search).get("d"));
const device = ref({
  shop: "BX",
  type: "washer",
  nr: "3",
  price: 400,
  duration: 100,
});

const topUpDialog = ref(false);
const payPalDialog = ref(false);

getCustomer();
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

const openTopUpDialog = () => {
  topUpDialog.value = true;
};
const openPayPalDialog = () => {
  payPalDialog.value = true;
};
const doTopUp = (amount, details) => {
  topUp(customer.value.id, amount, details);
};
</script>

<style scoped>
.payWithCredit {
}
</style>