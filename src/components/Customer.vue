<template>
  <v-card v-if="customer" class="bubble_style">
    <v-card-title>
      <v-row style="padding-bottom: 0">
        <v-col>Konto {{ customer.name }} </v-col>
        <v-col>Guthaben EUR {{ (customer.credit / 100).toFixed() }}</v-col>
      </v-row>
      <v-row style="padding-top: 0">
        <v-col>
          <small><small>ID: {{ customer.id }}</small></small> </v-col><v-col> </v-col><v-col>
          <v-btn @click="dialog = true" size="x-large" elevation="5">Aufladen</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row><v-col>Karten ID </v-col></v-row>
      <v-row><v-col></v-col></v-row>
      <v-card-actions> </v-card-actions>
      <v-row v-for="x in 10"><v-col>Datum Maschine Preis</v-col> </v-row>
    </v-card-text>
  </v-card>
  <v-card v-if="customer == null">
    <v-card-title style="font-size: 5rem">Sorry :(</v-card-title>
    <v-card-text>Es ist kein Kundenkonto gespeichert. <br /> Bitte <span class="action">scannen</span> Sie Ihre <span
        class="action">Bubble Card</span> erneut oder wenden Sie sich
      an unseren Kundenservice!</v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" elevation="5" style="font-size: 1.5rem" @click="closeError">Schließen</v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog">
    <TopUp :visible="dialog" :customer-id="customer.id" @close="dialog = false"
      @top-up="(amount, details) => { topUp(customer.value.id, amount, details) }" />
  </v-dialog>

</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useAPI } from "../composables/useAPI.js"

const { customer, getCustomer, topUp } = useAPI()

const dialog = ref(false)
getCustomer()
</script>
