<template>
  <!-- TODO add AGBs -->
  <div v-if="user || anonym" class="container bubble_style" :class="{ admin: admin }"
    :style="'height:' + windowInnerHeight + 'px'">
    <div class="bcard user">
      <!-- if anonym bubble card promotion -->
      <div v-if="anonym" class="anonym">
        <h2>Willkommen bei Bubble Point</h2>
        Kaufen Sie gleich jetzt noch eine Bubble Card und profitieren Sie von den
        günstigen Preisen und dem Komfort durch zahlen mit einem Klick!
      </div>
      <div v-if="admin" class="admin-config">
        <v-btn @click="navigateToAdmin" size="x-large" elevation="5" variant="outlined">
          Config
        </v-btn>
      </div>
      <div v-if="user" :class="{ userName: !admin, adminUser: admin }">
        {{ admin ? "Admin" : "Konto" }} <br />
        <p style="font-size: 1.5rem">{{ user.name }}</p>
        <p v-if="user.typ == 'admin'">Admin</p>
      </div>
      <div v-if="user && !admin" class="text">Guthaben EUR</div>
      <div v-if="user && !admin" :class="['balance', { 'glowing-text': triggerGlow }]" ref="balanceRef">
        {{ cent2euro(user.credit) }}
      </div>
      <div v-if="user && !admin" class="card-id">ID: {{ user.id }}</div>
      <div v-if="user && !admin" class="topUpButton">
        <v-btn @click="topUpDialog = true" size="large" elevation="5" variant="outlined" @mousedown="startPress"
          @mouseup="cancelPress" @mouseleave="cancelPress" @touchstart="startPress" @touchend="cancelPress">
          Aufladen
        </v-btn>
      </div>
    </div>

    <div v-if="deviceInfo" class="maschineName">
      {{ deviceDisplayName() }} NR. {{ deviceNr() }}
    </div>
    <div v-if="deviceInfo" class="shopAddress">
      {{ deviceInfo.location }}
    </div>
    <div v-if="deviceState" class="state" :class="deviceState">
      {{ deviceState.toUpperCase() }}
    </div>
    <div v-if="deviceInfo" class="price">
      Preis: EUR
      {{ cent2euro(deviceInfo.userprice) }}
      {{ deviceInfo.type == "dryer" ? "/ " + deviceInfo.dryer_units + " min" : "" }}
      <br />
      <span v-if="deviceInfo.price > deviceInfo.userprice"
        style="text-decoration: line-through; font-size: smaller; ">Normalpreis: {{
          cent2euro(deviceInfo.price) }}
        <v-icon icon="mdi-information" @click="showDiscounts"></v-icon></span>
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'dryer'" class="calcPrice">
      EUR {{ paymentAmount }} für {{ dryTime }} min
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'washer'" class="bcard selection">
      <div class="detergent">
        <label>Waschmittel</label>
        <TriState v-model="detergent" :onlyOff="!deviceInfo.detergent" :fixed="payed" />
      </div>
      <div class="info"><v-icon icon="mdi-information" @click="showInfo"></v-icon></div>
      <div class="softener">
        <label>Weichspüler</label>
        <TriState v-model="softener" :onlyOff="!deviceInfo.softener" :fixed="payed" />
      </div>
    </div>
    <div v-if="deviceInfo && deviceInfo.type == 'dryer'" class="bcard dry-time-container">
      <h4 class="dry-time-title">Trockenzeit Minuten</h4>
      <v-btn class="dry-time-minus" @click="dryTime = Math.max(10, dryTime - deviceInfo.dryer_units)" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <h1 class="dry-time">{{ dryTime }}</h1>
      <v-btn class="dry-time-plus" @click="dryTime = Math.min(60, dryTime + deviceInfo.dryer_units)" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <template v-if="!admin">
      <div v-if="payPalButtonVisible" class="payPalButton">
        <PayPalButton :amount="paymentAmount" :user-id="user ? user.id : 'anonym'" :deviceName="deviceInfo.name"
          @transactionApproved="payDeviceAndAllowStart" />
      </div>
      <div v-if="!payPalButtonVisible" class="payPalButton" style="text-align: center">
        <v-btn disabled="" height="45" width="100%" style="background: #777 !important">
          <img src="@/assets/paypal.png" height="18px" />
        </v-btn>
      </div>
    </template>
    <div v-if="user" class="creditButton">
      <v-btn elevation="10" height="6rem" width="100%" style="font-size: x-large"
        @click="payDeviceAndAllowStart(admin ? 'admin' : 'credit')" :disabled="payWithCreditDisabled">
        {{ admin ? "Freischalten" : "Mit Guthaben zahlen" }}
      </v-btn>
    </div>
    <div v-if="payed && !admin" class="payedInfo">
      <v-icon icon="mdi-checkbox-marked-circle" end size="3rem"></v-icon>
      Maschine ist {{ admin ? "freigeschalten" : "bezahlt" }}
    </div>
    <div class="footer-version">{{ APP_VERSION }}</div>

  </div>
  <v-dialog v-if="user" v-model="topUpDialog">
    <TopUp :visible="topUpDialog" :user-id="user.id" @close="topUpDialog = false" @top-up="topUpCredit" />
  </v-dialog>

  <v-dialog v-model="errorDialog" class="ma-3" elevation="10">
    <v-card class="bubble_style">
      <v-card-title style="font-size: 5rem"> Sorry :( </v-card-title>
      <v-card-text style="font-size: x-large">
        {{ errorMessage }}
        <br />Bitte wenden Sie sich an unseren Kundenservice!
        <br />
        <v-expansion-panels>
          <v-expansion-panel style="font-family: 'Courier New', Courier, monospace; font-size: small" title="Details"
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
  <v-snackbar v-model="snackbar.show" :color="snackbar.color">
    {{ snackbar.text }}
  </v-snackbar>
  <v-dialog v-model="infoModal">
    <v-card>
      <v-card-title>Waschmittel und Weichspüler</v-card-title>
      <v-card-text>
        <p>
          Waschmittel und Weichspüler (falls verfügbar) werden automatisch in die Maschine dosiert.
          <br />
          Wenn kein Waschmittel oder Weichspüler verfügbar ist, kann man diese jeweils nur abwählen.
        </p>
        <br />
        <p>
          Sowohl Waschmittel als auch Weichspüler sind im Preis der Maschine enthalten.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="infoModal = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="discountModal">
    <v-card>
      <v-card-title>Rabatte</v-card-title>
      <v-card-text>
        <!-- list user.discounts name and percentage-->
        <v-list>
          <v-list-item v-for="discount in deviceInfo.discounts" :key="discount.id">
            <v-list-item-title> {{ discount.percentage }}% {{ discount.name }} </v-list-item-title>
            {{ discount.userinfo }}
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="discountModal = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useAPI } from "../composables/useAPI";
import { useDevices } from "../composables/useDevices";
import { usePayment } from "../composables/usePayment";
import TopUp from "./TopUp.vue";
import { useUser } from "../composables/useUser";
import { useLongPress } from "../composables/useLongPress";
import { useDiscount } from "../composables/useDiscount";

const APP_VERSION = window.APP_VERSION ? window.APP_VERSION : "0.0.0";
const { startPress, cancelPress } = useLongPress();
const snackbar = ref({ color: "success", text: "gespeichert", show: false });
const infoModal = ref(false);
const discountModal = ref(false);
const user = ref(null);
const marketing = ref(null);
const topUpDialog = ref(false);
const errorDetail = ref("");
const errorMessage = ref("");
const payed = ref(false);
const dryTime = ref(30); // HARDCODED 
const { cent2euro } = useAPI();
const { getUser, reloadUser } = useUser();
const { deviceInfo, getDeviceInfo } = useDevices();
const { topUp, payment } = usePayment();
const { getMarketings, updateMarketing } = useDiscount();
window.addEventListener("resize", updateListHeight);
window.visualViewport?.addEventListener("resize", updateListHeight);
const payPalButtonVisible = computed(() => {
  if (!deviceInfo.value) {
    return false;
  }
  return (choosen.value || deviceInfo.value.type == "dryer") && !payed.value && deviceInfo.value.state == "free";
});

const payWithCreditDisabled = computed(() => {
  if (admin.value) {
    return false;
  }
  if (!deviceInfo.value) {
    return true;
  }
  let result = (
    payed.value ||
    (deviceInfo.value.type == "washer" &&
      (!choosen.value || deviceInfo.value.state != "free")) ||
    (!admin.value && user.value.credit < paymentAmount.value)
  );
  return result;
});

const deviceState = computed(() => {
  if (deviceInfo.value) {
    switch (deviceInfo.value.state) {
      case "free":
        return "frei";
      case "payed":
        return "bezahlt";
      case "busy":
        return "besetzt";
      case "outoforder":
        return "Defekt";
    }
  }
  return null;
});
const errorDialog = ref(false);
setTimeout(() => {
  errorDialog.value = (!user.value || !deviceInfo.value) && !anonym.value;
}, 3000);


const windowInnerHeight = ref(
  window.visualViewport?.height || window.innerHeight
);

function updateListHeight() {
  const currentHeight = window.visualViewport?.height || window.innerHeight;
  if (currentHeight > 650) {
    windowInnerHeight.value = currentHeight;
  }
}




const uuid = localStorage.getItem('uuid');
const props = defineProps(["deviceId"]);
async function initialize() {
  if (uuid) {
    try {
      const marketings = await getMarketings(uuid);
      const eligibleMarketing = marketings.find(element => element.eligible > 0);
      if (eligibleMarketing) {
        marketing.value = eligibleMarketing;
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await getDeviceInfo(props.deviceId, marketing.value ? marketing.value.code : null);
  } catch (error) {
    errorMessage.value = "Dieses Gerät ist leider nicht registriert";
    errorDetail.value = error;
  }
}

initialize();

getUser()
  .then((dbUser) => {
    user.value = dbUser;
    reloadUser(user);
  })
  .catch((error) => {
    console.log(error);
  });
const showInfo = () => {
  infoModal.value = true;
};
const showDiscounts = () => {
  discountModal.value = true;
};
const anonym = computed(() => {
  return user ? !user.value : true;
});

const admin = computed(() => {
  if (user.value) {
    return user.value.typ == "admin";
  }
  return false;
});
const choosen = computed(() => {
  return detergent.value != null && softener.value != null;
});
const navigateToAdmin = () => {
  window.location.href = "/admin";
};

const triggerGlow = ref(false);
const balanceRef = ref(null);
const glow = () => {
  triggerGlow.value = false;
  nextTick(() => {
    void balanceRef.value.offsetWidth; // Force reflow to restart animation
    triggerGlow.value = true;
  });
  setTimeout(() => {
    triggerGlow.value = false;
  }, 3000); // Match with animation duration
};

const topUpCredit = (topAmount, details) => {
  topUp(user.value.id, topAmount, details, "paypal").then(() => {
    // wait for the transaction to be processed
    setTimeout(reloadUser(user).then((u) => {
      user.value = u;
      setTimeout(glow(), 300)
    }), 1000);
  });
  topUpDialog.value = false;
};



// Closes error dialog and redirects back to the homepage.
const closeError = () => {
  errorDialog.value = false;
  window.location.href = "/";
};

const deviceNr = () => {
  if (deviceInfo.value) {
    return deviceInfo.value.name.split("/")[2];
  }
  return "?";
};
// Returns a label for the device depending on its name.
const deviceDisplayName = () => {
  if (deviceInfo.value) {
    var sname = deviceInfo.value.name.split("/");
    var t = sname[1].substring(0, 1).toUpperCase();
    switch (t) {
      case "W":
        return "Waschmaschine";
      case "D":
        return "Trockner";
      default:
        return deviceInfo.value.name;
    }
  }
};

// Computes the payment amount in euros for PayPal.
const paymentAmount = computed(() => {
  if (deviceInfo.value) {
    let price = deviceInfo.value.userprice;
    if (deviceInfo.value.type == "dryer") {
      price = (price * dryTime.value) / deviceInfo.value.dryer_units;
    }
    return cent2euro(price).toString();
  }
  return "0";
});

const detergent = ref(null);
const softener = ref(null);

// Handles payment logic and allows the device to start.
const payDeviceAndAllowStart = (source, details) => {
  if (deviceInfo.value.type == "washer") {
    dryTime.value = 0;
  }
  const machine_id = Number(props.deviceId)
  const impulses = deviceInfo.value.type == "dryer" ? dryTime.value / deviceInfo.value.dryer_units : null;
  const amount = Math.floor(Number(paymentAmount.value) * 100);


  const paymentVariables = {
    card_id: user.value ? user.value.id : "anonym",
    machine_name: deviceInfo.value.name,
    amount: amount,
    machine_id: machine_id,
    dryer_impulses: impulses,
    dryer_units: deviceInfo.value.dryer_units,
    source: source,
    details: details,
    selection: {
      detergent: detergent.value,
      softener: softener.value,
    },
    marketing_code: marketing.value ? marketing.value.code : null,
  };
  payment(paymentVariables).then(() => {
    if (user.value) {
      reloadUser(user);
    }
    payed.value = true;
    if (marketing.value) {
      marketing.value.eligible--;
      updateMarketing(marketing.value);
    }
    if (admin.value) {
      snackbar.value.text = `Die Zahlung war erfolgreich! ${deviceDisplayName()} NR. ${deviceNr()} ist freigeschalten`
      snackbar.value.color = 'success'
      snackbar.value.show = true
    }
  }
  ).catch((error) => {
    errorMessage.value = "Die Zahlung konnte nicht abgeschlossen werden";
    errorDetail.value = error;
    errorDialog.value = true;
  });
};
</script>

<style>
@import "./PayDevice.css";

:root {
  --v-theme-surface: rgba(32, 193, 43, 0.6);
}
</style>
