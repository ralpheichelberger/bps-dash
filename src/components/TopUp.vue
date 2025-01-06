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
                    <PayPalButton2 :amount="amount.toString()" :user-id="userId"
                        @transactionApproved="topUpUser" @transactionCanncelled="showUserCancelled" 
                        @transactionError="showError"
                        />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue"
const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const props = defineProps({
    userId: {
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
const topUpUser = (details) => {
    emit("top-up", amount.value * 100, details) // convert to cents
    emit("close")
}
const showUserCancelled = () => {
    alert("Bezahlung abgebrochen")
}
const showError = (err) => {
    alert("Bezahlung fehlgeschlagen: " + err)
}
</script>
