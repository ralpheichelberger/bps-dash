<template>
    <v-card>
        <v-card-actions>
            <h2>Guthaben aufladen</h2><v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
        </v-card-actions>
        <v-radio-group v-model.number="amount" row>
            <v-radio label="20 EUR" :value="20"></v-radio>
            <v-radio label="50 EUR" :value="50"></v-radio>
            <v-radio label="100 EUR" :value="100"></v-radio>
        </v-radio-group>
        <v-sheet class="ma-4">
            <v-btn width="100%" @click="topUpCustomer">Fake Pay</v-btn>
        </v-sheet>
        <v-sheet class="ma-4">
            <PayPalButton :clientId="payPalClientId" :amount="amount.toString()" :customerId="cardID"
                @transactionApproved="topUpCustomer" />
        </v-sheet>
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
const emit = defineEmits(["close", "top-up"])
const amount = ref(20)
const topUpCustomer = () => {
    emit("top-up", amount.value*100) // convert to cents
    emit("close")
}
</script>
