<template> <!-- FIXME add AGBs -->
  <div v-if="user" class="container bubble_style" :class="{ admin: admin }"
    :style="'height:' + windowInnerHeight + 'px'">
    <div class="user">
      <div v-if="admin" class="admin-config">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
          Config
        </v-btn>
      </div>
      <div :class="{ userName: !admin, adminUser: admin }">
        {{ admin ? "Admin" : "Konto" }} <br />
        <p style="font-size:1.5rem"> {{ user.name }} </p>
        <p v-if="user.typ == 'admin'">Admin</p>
      </div>
      <div v-if="!admin" class="text">
        Guthaben EUR
      </div>
      <div v-if="!admin" class="balance">
        {{ cent2euro(user.credit) }}
      </div>
      <div v-if="!admin" class="card-id">
        ID: {{ user.id }}
      </div>
      <div v-if="!admin" class="topUpButton">
        <v-btn @click="topUpDialog = true" size="large" elevation="5" variant="outlined">
          Aufladen
        </v-btn>
      </div>
    </div>
    <div v-if="userPayments" class="payments">
      <v-table :height="(windowInnerHeight - 180) + 'px'" width="100%" fixed-header>
        <thead>
          <tr>
            <th>Zeit</th>
            <th>Betrag</th>
            <th>Gerät</th>
            <th>Typ</th>
            <!-- <th>Rechnung</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userPayments" :key="item.timestamp">
            <td>{{ toDateTime(item.timestamp) }}</td>
            <td>{{ centToEuro(item.amount) }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.typ }}</td>
            <!-- <td>{{ item.bill_nr }}</td> -->
          </tr>
        </tbody>
      </v-table>
    </div>

  </div>
  <v-dialog v-if="user" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :user-id="user.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>

  <v-dialog v-model="errorDialog" class="ma-3" elevation="10">
    <v-card class="bubble_style">
      <v-card-title style="font-size: 5rem">
        Sorry :(
      </v-card-title>
      <v-card-text style="font-size: x-large;">
        {{ errorMessage }}
        <br />Bitte wenden Sie sich an unseren Kundenservice!
        <br />
        <v-expansion-panels>
          <v-expansion-panel style="font-family: 'Courier New', Courier, monospace; font-size: small;" title="Details"
            :text="errorDetail">
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" elevation="5" style="font-size: 1.5rem" @click="closeError">
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI";
import TopUp from "./TopUp.vue";
import { useAuth } from "../composables/useAuth";
import { usePayment } from "../composables/usePayment";

const topUpDialog = ref(false);
const errorDetail = ref("");
const errorMessage = ref("");
const userPayments = ref([]);

const { user, getUser, cent2euro } = useAPI();
const { cardID } = useAuth();
const { topUp, payments } = usePayment();
const props = defineProps(["id"]);
const errorDialog = ref(false);
const windowInnerHeight = ref(window.innerHeight);
window.addEventListener('resize', updateListHeight);
function updateListHeight() {
  windowInnerHeight.value = window.innerHeight;
}
setTimeout(() => {
  errorDialog.value = !user.value
}, 3000);
cardID.value = props.id;
if (!cardID.value) {
  errorDialog.value = true;
  errorMessage.value = "Es ist kein Kundenkonto gespeichert.";
  errorDetail.value = "Bitte scannen Sie Ihre Bubble Card erneut oder wenden Sie sich an unseren Kundenservice!";
}
getUser(cardID.value).then((dbUser) => {
  localStorage.setItem("user", JSON.stringify(dbUser))
  payments(cardID.value).then((data) => {
    userPayments.value = data
  }).catch((error) => {
    console.log(error)
  });
}).catch((error) => {
  if (error.response.status == 401) {
    errorDialog.value = true;
    errorMessage.value = "Kundenkonto gesperrt.";
    errorDetail.value = "Bitte scannen Sie eine andere Bubble Card oder wenden Sie sich an unseren Kundenservice!";
  }
});
const admin = computed(() => {
  if (user.value) {
    return user.value.typ == "admin";
  }
  return false;
})


const navigateToAdmin = () => {
  window.location.href = "/admin";
}
const topUpCredit = (topAmount, details) => {
  topUp(user.value.id, topAmount, details).then(() => {
    getUser(user.value.id).then((dbUser) => {
      localStorage.setItem("user", JSON.stringify(dbUser))
      user.value = dbUser
      payments(user.value.id).then((data) => {
        userPayments.value = data
      }).catch((error) => {
        console.log(error)
      });
    }).catch((error) => {
      console.log(error)
    });
  })
  topUpDialog.value = false
}

// Closes error dialog and redirects back to the homepage.
const closeError = () => {
  errorDialog.value = false;
  window.location.href = "/";
};
const toDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};
const centToEuro = (cent) => {
  return (cent / 100).toFixed(2);
};


</script>
<style>
.payments {
  grid-row: 4;
  grid-column: span 2;
  margin-top: 1rem;
}
</style>