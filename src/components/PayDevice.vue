<template>
  <v-card v-if="customer" class="bubble_style">
    <v-card-title style="font-size: xx-large;">
      <v-row>
        <v-col>Konto {{ customer.name }} </v-col>
        <v-col></v-col>
        <v-col>Guthaben EUR {{ customer.credit }}</v-col>
      </v-row>

      <v-row style="padding-top: 0">
        <v-col><small><small>ID: {{ customer.id }}</small></small></v-col>
        <v-col></v-col>
        <v-col style="padding-top: 0">
          <v-btn @click="topUpDialog = true" size="x-large" elevation="5">Aufladen</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider :thickness="3"></v-divider>
    <v-card-text v-if="deviceInfo" style="font-size: xx-large;">
      <v-row><v-col></v-col></v-row>
      <v-row><v-col>{{ deviceInfo.location }}</v-col></v-row>
      <v-row><v-col>{{ deviceName() }}</v-col></v-row>
      <v-row><v-col>Preis: EUR {{ cent2euro(deviceInfo.price) }}</v-col></v-row>

      <v-divider :thickness="3"></v-divider>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <PayPalButton :amount="cent2euro(deviceInfo.price).toString()" :customer-id="customer.id"
        @transactionApproved="payDeviceAndAllowStart" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn elevation="10" height="8rem" width="100%" @click="payDeviceAndAllowStart" style="font-size: x-large;">
            Mit Guthaben zahlen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="topUpDialog">
      <TopUp :visible="topUpDialog" :customer-id="customer.id" @close="topUpDialog = false"
        @top-up="(amount, details) => { topUp(customer.value.id, amount, details) }" />
    </v-dialog>
    <v-dialog v-model="payPalDialog">

    </v-dialog>

  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useAPI } from "../composables/useAPI";
import PayPalPayment from "./PayPalPayment.vue";

const { customer, getCustomer, topUp, deviceInfo, getDeviceInfo, allowStart, payment, cent2euro } = useAPI();

const topUpDialog = ref(false);
const payPalDialog = ref(false);

getCustomer();
getDeviceInfo(new URLSearchParams(window.location.search).get("d"));
const deviceName = () => {
  switch (deviceInfo.value.name.substring(4, 5)) {
    case "W":
      return "Waschmaschine Nr. " + deviceInfo.value.name.substring(5);
    case "D":
      return "Trockner Nr. " + deviceInfo.value.name.substring(5);
    default:
      return deviceInfo.value.name;
  }
};
const payDeviceAndAllowStart = (details) => {
  payment(customer.id, deviceInfo.value.name, deviceInfo.value.preis, details);
  allowStart(deviceInfo.value.name, deviceInfo.value.duration);
};
</script>
