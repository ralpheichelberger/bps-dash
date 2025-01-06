<template>
    <div id="paypal-button-container"></div>
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
}).then((paypal) => {
    paypal.Buttons({
        style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            tagline: false,
        },
        
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        user_id: props.userId,
                        amount: {
                            currency: "EUR",
                            value: props.amount,
                        },
                    },
                ],
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                emit("transactionApproved",'paypal', details);
            });
        },
        onCancel: (data) => {
            emit("transactionCanncelled");
        },
        onError: (err) => {
            emit("transactionError", err);
        },
    }).render('#paypal-button-container');
}).catch((error) => {
    console.error('failed to load the PayPal JS SDK script', error);
});
</script>