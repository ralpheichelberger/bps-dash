<script setup>
import { useRouter } from 'vue-router';
import { useAPI } from "../composables/useAPI.js"
import { usePayment } from "../composables/usePayment.js";
import { v4 as uuidv4 } from 'uuid';

const { saveMarketing, getMarketing, updateMarketing } = useAPI()
const router = useRouter();
const props = defineProps(['code']);
const goToHome = () => {
  router.push('/');
};
const uuid = localStorage.getItem("uuid")
const createNewMarketingLog = () => {
  let marketing = {
    code: props.code,
    counter: 1,
    uuid: uuid ? uuid : uuidv4()
  }
  localStorage.setItem("uuid", marketing.uuid)
  saveMarketing(marketing)
  goToHome()
}
if (uuid) {
  getMarketing(props.code, uuid).then((res) => {
    let marketing = res
    if (marketing) {
      marketing.cnt++
    }
    updateMarketing(marketing)
    goToHome()
  }).catch((err) => {
    if (String(err).includes("Not Found")) {
      createNewMarketingLog()
    }
  })
} else {
  createNewMarketingLog()
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