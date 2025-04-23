<template>
    <div id="paypal-button-container2"></div>
</template>
<script setup>
import { loadScript } from '@paypal/paypal-js';

const props = defineProps({
    amount: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["transactionApproved", "transactionCancelled", "transactionError"]);
const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

loadScript({
    clientId: payPalClientId,
    currency: "EUR",
}).then((paypal) => {
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        // user_id: props.userId,
                        amount: {
                            value: props.amount,
                            currency_code: "EUR",
                        },
                        reference_id: props.userId,
                    },
                ],
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                emit("transactionApproved", details);
            });
        },
        onCancel: (data) => {
            emit("transactionCanncelled");
        },
        onError: (err) => {
            emit("transactionError", err);
        },
    }).render('#paypal-button-container2');
}).catch((error) => {
    console.error('failed to load the PayPal JS SDK script', error);
});
</script>