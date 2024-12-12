<template>
    <v-card>
        <v-card-actions>
            <h2>Guthaben aufladen</h2><v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
        </v-card-actions>
        <v-radio-group v-model="amount" row>
            <v-radio label="20 EUR" value="20"></v-radio>
            <v-radio label="50 EUR" value="50"></v-radio>
            <v-radio label="100 EUR" value="100"></v-radio>
        </v-radio-group>
        <v-btn @click="topUpCustomer">Fake Pay</v-btn>
        <PayPalButton :clientId="payPalClientId" :amount="amount" :customerId="cardID" @transactionApproved="topUpCustomer"/>
    </v-card>
</template>

<script setup>
import { ref, watch } from "vue"
const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const props = defineProps({
    cardID: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        required: true,
    },
});
const dialog = ref(props.visible)
const emit = defineEmits(["close"])
const amount = ref("20")
const topUpCustomer = () => {
    console.log("topUpCustomer", amount.value)
    emit("close")
}
</script>
