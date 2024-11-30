<template>
    <v-card v-if="customer">
        <v-card-title class="bubble_background">
            <v-row style="padding-bottom:0">
                <v-col>Konto {{ customer.name }} </v-col>
                <v-col></v-col>
                <v-col >Guthaben EUR {{ balance }}</v-col>
            </v-row>
            <v-row style="padding-top:0">
                <v-col><small><small>ID: {{ customer.id }}</small></small></v-col>
                <v-col></v-col>
                <v-col style="padding-top:0"> <v-btn size="x-large" elevation="5">Aufladen</v-btn></v-col>
            </v-row>
        </v-card-title>
        <v-card-text v-if="device">
            <v-row><v-col></v-col></v-row>
            <v-row><v-col>{{ device.shop }}</v-col></v-row>
            <v-row><v-col>{{ device.type }} {{ device._number }}</v-col></v-row>
            <v-row><v-col>EUR {{ (device.price / 100).toFixed(2) }}</v-col></v-row>
            <v-col> <v-btn elevation="5" @click="pay">Bezahlen</v-btn></v-col>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialog">
    <v-card>payment</v-card>

    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as bps from '../bpsclient'
var dialog = ref(false)
var cardID = ref(null)
var customer = ref(null)
var balance = ref(0)
var deviceID = ref(new URLSearchParams(window.location.search).get('d'))
var device = ref(null)

// Retrieve cardID from local storage
cardID.value = localStorage.getItem("cardID")
if (!cardID.value) cardID.value = "d2gH29R0H"

var api = new bps.DefaultApi()
var defaultClient = bps.ApiClient.instance
var BasicAuth = defaultClient.authentications['BasicAuth']
BasicAuth.username = 'ralph'
BasicAuth.password = 'APIpassword'
api.getCustomer(cardID.value, (error, data, response) => {
    customer.value = data;
    balance.value = (customer.value.credit / 100).toFixed(2)
})
api.deviceInfo(deviceID.value, (error, data, response) => {
    device.value = data;
})
var pay = () => {
    dialog.value = true
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
}

@font-face {
    font-family: "DreamingOutloud";
    src: url("@/assets/bubblekassa.otf") format("opentype");
}

v-card {
    font-family: "DreamingOutloud", Arial, sans-serif;
}
</style>
