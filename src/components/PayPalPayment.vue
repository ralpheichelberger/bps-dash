<template>
    <v-card class="bubble_style">
        <v-card-actions>
            <h2>Maschine zahlen</h2><v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
        </v-card-actions>
        <v-card-text>
            <PayPalButton :amount="amount.toString()" :user-id="userId"
                @transactionApproved="topUpUser" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue"
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
const emit = defineEmits(["close", "pay-device"])
const amount = ref(20)
const topUpUser = (details) => {
    emit("pay-device", amount.value * 100, details) // convert to cents
    emit("close")
}
</script>
