<template> <!-- FIXME add AGBs / DSGVO -->
  <div v-if="customer" class="container bubble_style" :class="{ admin: admin }">
    <div class="customerName">
      Konto {{ customer.name }}
      <h2 v-if="customer.typ == 'admin'">Admin</h2>
    </div>
    <span v-if="!admin">
      <div class="balance">
        Guthaben EUR {{ cent2euro(customer.credit) }}
      </div>
      <div class="cardId">
        ID: {{ customer.id }}
      </div>
      <div class="topUpButton">
        <v-btn @click="topUpDialog = true" size="x-large" elevation="5" variant="outlined">
          Aufladen
        </v-btn>
      </div>
    </span>
    <span v-else>
      <div class="topUpButton">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
          Config
        </v-btn>
      </div>
    </span>
  </div>
  <v-dialog v-if="customer" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :customer-id="customer.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>

  <v-card v-if="customer == null">
    <v-card-title style="font-size: 5rem">Sorry :(</v-card-title>
    <v-card-text>Es ist kein Kundenkonto gespeichert. <br /> Bitte <span class="action">scannen</span> Sie Ihre <span
        class="action">Bubble Card</span> erneut oder wenden Sie sich
      an unseren Kundenservice!</v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" elevation="5" style="font-size: 1.5rem" @click="closeError">Schließen</v-btn>
    </v-card-actions>
  </v-card>


</template>

<script setup>
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI.js"
import { usePayment } from "../composables/usePayment.js";

const { customer, getCustomer, cent2euro } = useAPI()
const { topUp } = usePayment()
const closeError = () => {
  window.location.href = "/";
};
const topUpDialog = ref(false);
const props = defineProps(["id"]);
const admin = computed(() => {
  if (customer.value) {
    return customer.value.typ == "admin";
  }
  return false;
}
)
getCustomer(props.id)
const navigateToAdmin = () => {
  window.location.href = "/admin";
}

// getCustomer()

const topUpCredit = (topAmount, details) => {
  topUp(customer.value.id, topAmount, details).then(() => {
    getCustomer()
  })
  topUpDialog.value = false
}

</script>
