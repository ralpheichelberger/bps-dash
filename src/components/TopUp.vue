<template>
    <v-card class="bubble_style">
        <v-card-actions>
            <h2>Guthaben aufladen</h2><v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
        </v-card-actions>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-radio-group v-model.number="amount" label="Welchen Betrag möchtest du aufladen?">
                        <v-radio label="20 EUR" :value="20"></v-radio>
                        <v-radio label="50 EUR" :value="50"></v-radio>
                        <v-radio label="100 EUR" :value="100"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn width="100%" @click="topUpCustomer">Fake Pay</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <PayPalButton :amount="amount.toString()" :customer-id="customerId"
                        @transactionApproved="topUpCustomer" @transactionCanncelled="showCustomerCancelled" 
                        @transactionError="showError"
                        />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, watch } from "vue"
const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const props = defineProps({
    customerId: {
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
const topUpCustomer = (details) => {
    emit("top-up", amount.value * 100, details) // convert to cents
    emit("close")
}
const showCustomerCancelled = () => {
    alert("Bezahlung abgebrochen")
}
const showError = (err) => {
    alert("Bezahlung fehlgeschlagen: " + err)
}
</script>
