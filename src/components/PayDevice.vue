<template>
    <v-card v-if="customer" style="
        font-family: 'DreamingOutloud', Arial, sans-serif;    
        background: var(--background-gradient);
        color:black;
        height: 100vh;
        ">
        <v-card-title>
            <v-row style="padding-bottom:0">
                <v-col>Konto {{ customer.name }} </v-col>
                <v-col></v-col>
                <v-col>Guthaben EUR {{ balance }}</v-col>
            </v-row>
            <v-row style="padding-top:0">
                <v-col><small><small>ID: {{ customer.id }}</small></small></v-col>
                <v-col></v-col>
                <v-col style="padding-top:0"> 
                <v-btn @click="topUp" size="x-large" elevation="5">Aufladen</v-btn>
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
                    <v-btn @click="payDevice">Mit Guthaben zahlen</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <PayPalButton :clientId="payPalClientId" :amount="cent2euro(device.price)" :customerId="cardID" />
                </v-col>
            </v-row>
        </v-card-text>
        <v-dialog v-model="dialog">
            <TopUp :visible="dialog" :cardID="cardID" @close="dialog = false" />
        </v-dialog>
    </v-card>

</template>

<script setup>

import { ref } from "vue"
import * as bps from '../bpsclient'
import Device from "../bpsclient/model/Device"
import PayPalButton from "./PayPalButton.vue"

const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const cardID = ref(null)
const customer = ref(null)
const balance = ref(0)
const deviceID = ref(new URLSearchParams(window.location.search).get('d'))
const device = ref({}) // FIXME: testdata
const dialog = ref(false);

const cent2euro = (val) => (val / 100).toFixed(2)

// Retrieve cardID from local storage
cardID.value = localStorage.getItem("cardID")
if (!cardID.value) cardID.value = "d2gH29R0H"
device.value = { shop: "BX", type: "washer", _number: "3", price: 400 }
const client = new bps.ApiClient();
const api = new bps.DefaultApi(client);
api.getCustomer(cardID.value, (error, data, response) => {
    customer.value = data;
    if (customer.value?.credit) balance.value = (customer.value.credit / 100).toFixed(2)
})

const payDevice = () => {
    console.log("payDevice", device.value)
}
const topUp = () => {
    dialog.value = true;
}
</script>

<style scoped>
:root {
    --background-gradient: linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC, #FFD6A5, #C1F7D5, #A2E3F7, #A1C4FD);
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
</style>
