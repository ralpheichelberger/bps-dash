<template>
    <div id="paypal-button-container"></div>
</template>

<script setup>
import { loadScript } from "@paypal/paypal-js";
import { onMounted } from "vue";

// Props
const props = defineProps({
    clientId: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }, 
    customerId: {
        type: String,
        required: true,
    }
});
const emit = defineEmits(["transactionApproved","transactionCanncelled","transactionError"]);

onMounted(async () => {
    let paypal;
    try {
        paypal = await loadScript({ "client-id": props.clientId, currency: "EUR" });
    } catch (error) {
        console.error("Failed to load the PayPal JS SDK script", error);
        return;
    }

    if (paypal) {
        try {
            await paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                customer_id: props.customerId,
                                amount: {
                                    currency_code: "EUR",
                                    value: props.amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                    });
                },
                onCancel: (data) => {
                    emit("transactionCanncelled");
                },
                onError: (err) => {
                    emit("transactionError", err);
                },
            }).render("#paypal-button-container");
        } catch (error) {
            console.error("Failed to render the PayPal Buttons", error);
        }
    }
});
</script>
