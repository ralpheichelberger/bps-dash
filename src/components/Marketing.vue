<template>
  <div class="bubble_style">
    <img src="@/assets/bubblepoint.png" width="100%" />
    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title style="text-align: center;">Dein Rabatt Coupon</v-card-title>
        <v-card-text>
          <p>Glückwunsch! <br /> Dein exklusiver Rabatt wartet auf dich!</p>
          <br />
          <p>So einfach geht’s:</p>

          <p>✅ QR-Code an der entsprechenden Maschine scannen und URL im Browser öffnen</p>
          <p>✅ Rabatt wird automatisch angewendet – keine Eingabe nötig!</p>
          <p>✅ Waschen & sparen in einem Schritt!</p>
          <v-alert style="margin-top:1rem" :type="marketing.eligible>0?'success':'warning'">{{ couponCode }}</v-alert>
          <br />
          <p style="font-size: x-small;">*Nur ein Rabatt pro Kunde einlösbar. Nicht mit anderen Aktionen kombinierbar.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="goToHome">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script setup>
const DEFAULT_ELIGABLE_CNT = 1;
import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useAPI } from "../composables/useAPI.js"
import { v4 as uuidv4 } from 'uuid';
import { useDiscount } from '../composables/useDiscount.js';

const { saveMarketing, getMarketing, updateMarketing } = useAPI()
const { getDiscountByCode } = useDiscount()
const router = useRouter();
const props = defineProps(['code']);
const showDialog = ref(false);
const couponCode = ref('');
const marketing = ref();
const goToHome = () => {
  router.push('/');
};
const uuid = localStorage.getItem("uuid")
marketing.value = {
  code: props.code,
  counter: 1,
  uuid: uuid ? uuid : uuidv4(),
  eligible: DEFAULT_ELIGABLE_CNT,
};
onMounted(() => {

  const init = async () => {
    if (uuid) {
      await getMarketing(props.code, uuid).then((res) => {
        marketing.value = res
        if (marketing) {
          marketing.value.cnt++
        }
        updateMarketing(marketing.value)
      }).catch((err) => {
        if (String(err).includes("Not Found")) {
          localStorage.setItem("uuid", marketing.value.uuid)
          saveMarketing(marketing.value)
          couponCode.value = marketing.value.code;
          showDialog.value = true;
        }
      })
    } else {
      marketing = createNewMarketingLog()
    }
    couponCode.value = marketing.value.code;
    getDiscountByCode(marketing.value.code).then((res) => {
      if (marketing.value.eligible > 0) {
      couponCode.value = res.percentage + "% Rabatt - " + res.name;
      } else {
        couponCode.value = "Bereits eingelöst: "+ res.percentage + "% Rabatt - " + res.name;
      }
    })
    showDialog.value = true;
  }
  init()
});
</script>


<style scoped></style>
