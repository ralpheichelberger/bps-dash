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
          <v-btn @click="topUpDialog = true" size="x-large" elevation="5">Aufladen</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="device">
      <v-row><v-col></v-col></v-row>
      <v-row><v-col>{{ device.shop }}</v-col></v-row>
      <v-row><v-col>{{ device.type }} {{ device.nr }}</v-col></v-row>
      <v-row><v-col>EUR {{ cent2euro(device.price) }}</v-col></v-row>


      <v-row justify="center">
        <v-col>
          <v-btn elevation="10" color="blue" height="8rem" width="100%" @click="topUpDialog = true">Mit PayPal
            zahlen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn elevation="10" height="8rem" width="100%" @click="allowStart">Mit Guthaben zahlen</v-btn>
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
      <PayPalPayment :visible="payPalDialog" :customer-id="customer.id" @close="payPalDialog = false"
        @pay-device="allowStart" />
    </v-dialog>

  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useAPI } from "../composables/useAPI";
import PayPalPayment from "./PayPalPayment.vue";

const { customer, getCustomer, topUp, deviceInfo, getDeviceInfo, allowStart, cent2euro } = useAPI();

const topUpDialog = ref(false);
const payPalDialog = ref(false);

getCustomer();
getDeviceInfo(new URLSearchParams(window.location.search).get("d"));


</script>
