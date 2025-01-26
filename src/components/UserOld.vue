<template> <!-- FIXME add AGBs / DSGVO -->
  <div class="container bubble_style" :class="{ admin: admin }">
    <template v-if="user">
      <div class="userName">
        Konto {{ user.name }}
        <h2 v-if="user.typ == 'admin'">Admin</h2>
      </div>
      <template v-if="!admin">
        <div class="balance">
          Guthaben EUR {{ cent2euro(user.credit) }}
        </div>
        <div class="cardId">
          ID: {{ user.id }}
        </div>
        <div class="topUpButton">
          <v-btn @click="topUpDialog = true" size="x-large" elevation="5" variant="outlined">
            Aufladen
          </v-btn>
        </div>
      </template>
      <div v-if="admin" class="balance">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
          Config
        </v-btn>
      </div>
      <div v-if="customer" class="transactions">
        <p>
          ID: {{ customer.id }}
        </p>
        <p>
          Name: {{ customer.name }}
        </p>
        <p>
          Balance: {{ customer.credit }}
        </p>
        <p>
          Typ: {{ customer.typ }}
        </p>
        <p>
          Active: {{ customer.active }}
        </p>

      </div>
    </template>
  </div>
  <v-dialog v-if="user" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :user-id="user.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>

  <v-dialog v-model="errorDialog" class="error-dialog">
    <v-card-title style="font-size: 5rem">Sorry :(</v-card-title>
    <v-card-text>Es ist kein Kundenkonto gespeichert. <br /> Bitte <span class="action">scannen</span> Sie Ihre <span
        class="action">Bubble Card</span> erneut oder wenden Sie sich
      an unseren Kundenservice!</v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" elevation="5" style="font-size: 1.5rem" @click="closeError">Schließen</v-btn>
    </v-card-actions>
  </v-dialog>


</template>

<script setup>
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI.js"
import { usePayment } from "../composables/usePayment.js";

const { user, getUser, cent2euro, customer } = useAPI()
const { topUp } = usePayment()
const closeError = () => {
  window.location.href = "/";
};
const topUpDialog = ref(false);
const errorDialog = computed(() => {
  return !user.value
})
const props = defineProps(["id"]);
const admin = computed(() => {
  if (user.value) {
    return user.value.typ == "admin";
  }
  return false;
}
)
getUser(props.id).then((dbUser) => {
  localStorage.setItem("user", JSON.stringify(dbUser))
}).catch(() => {
  console.log("no user found")
})
const navigateToAdmin = () => {
  window.location.href = "/admin";
}


const topUpCredit = (topAmount, details) => {
  topUp(user.value.id, topAmount, details).then(() => {
    getUser(user.value.id)
  })
  topUpDialog.value = false
}

</script>
<style scoped>
.transactions {
  grid-row: 4;
  grid-column: 1 / 3;
  padding: 1rem;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  background: var(--background-gradient);
  color: black;
  width: 100%;
}
</style>