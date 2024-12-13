<template>
    <v-card v-if="customer">
        <v-card-title>
            <v-row style="padding-bottom:0">
                <v-col>Konto {{ customer.name }} </v-col>
                <v-col>Guthaben EUR {{ balance }}</v-col>
            </v-row>
            <v-row style="padding-top:0">
                <v-col>
                    <small><small>ID: {{ customer.id }}</small></small>
                </v-col><v-col>
                </v-col><v-col>
                    <v-btn @click="topUp" size="x-large" elevation="5">Aufladen</v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row><v-col>Karten ID </v-col></v-row>
            <v-row><v-col></v-col></v-row>
            <v-card-actions>

            </v-card-actions>
            <v-row v-for="x in 10"><v-col>Datum Maschine Preis</v-col> </v-row>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialog">
        <TopUp :visible="dialog" :cardID="cardID" @close="dialog = false" />
    </v-dialog>
    <v-dialog v-model="errorDialog">
        <v-card>
            <v-card-title>Sorry</v-card-title>
            <v-card-text>Die Bubble Karte '{{ cardID }}' ist leider nicht registriert. Bitte wenden Sie sich an unseren Kundenservice!</v-card-text>
            <v-card-actions>
                <v-btn @click="closeError">Schließen</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style>
:root {
    --background-gradient: linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC, #FFD6A5, #C1F7D5, #A2E3F7, #A1C4FD);
    /* Pastel gradient */
}

.bubble_background {
    background: var(--background-gradient);
    color: black;
    height: 7rem;
}
</style>
<script setup>
import { ref } from "vue";
import * as bps from '../bpsclient';
console.log("Customer")
const cardID = ref(null);
const customer = ref(null);
const balance = ref(0);
const dialog = ref(false);
const errorDialog = ref(false);

cardID.value = localStorage.getItem("cardID");
if (!cardID.value) cardID.value = "d2gH29R0H"

const client = new bps.ApiClient();
const api = new bps.DefaultApi(client);
api.getCustomer(cardID.value, (error, data, response) => {
    if (error) {
        errorDialog.value = true;
        return;
    }
    customer.value = data;
    balance.value = (customer.value.credit / 100).toFixed(2)
})
const topUp = () => {
    dialog.value = true;
}
const closeError = () => {
    errorDialog.value = false;
    window.location.href = "/";
}
</script>

<style scoped>
@font-face {
    font-family: "DreamingOutloud";
    src: url("@/assets/bubblekassa.otf") format("opentype");
}


.v-card {
    font-family: "DreamingOutloud", Arial, sans-serif;
    background: var(--background-gradient);
    color: black;
    height: 100vh;
}
</style>
