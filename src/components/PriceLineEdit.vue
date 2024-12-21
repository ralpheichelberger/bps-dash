<template>
    <!-- Only show the card if priceLine is provided -->
    <v-card v-if="priceLine">
        <!-- Actions -->
        <v-card-actions>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
            <v-spacer></v-spacer>
            <!-- We emit a "delete" event if you want to handle deletion outside -->
            <v-btn text color="error" @click="emit('delete-price-line')" disabled >
                Delete
            </v-btn>
            <v-btn color="primary" text @click="saveChanges">
                Save
            </v-btn>
        </v-card-actions>

        <!-- Title -->
        <v-card-title>
            Edit PriceLine
        </v-card-title>

        <!-- Fields -->
        <v-card-text>
            <v-text-field id="priceLine-id" v-model="priceLine.id" label="ID" :disabled="update" required />
            <v-text-field id="priceLine-price" v-model.number="priceLine.price" label="Price in Euro Cent" type="number"
                required />
        </v-card-text>
    </v-card>

    <!-- Snackbar for feedback -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import * as bps from '../bpsclient' // or wherever your generated client is located

// Props from the parent
const props = defineProps({
    priceLine: {
        type: Object,
        default: () => ({}),
    },
    update: {
        type: Boolean,
        default: false,
    },
})

// Emitted events
const emit = defineEmits(['close', 'delete-price-line', 'reload'])

// Simple snackbar state to display feedback
const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
})

// Save or update PriceLine
const saveChanges = () => {
    const api = new bps.DefaultApi(new bps.ApiClient())

    if (props.update) {
        // UPDATE
        api.updatePriceLine(props.priceLine, (error, data, response) => {
            if (error) {
                snackbar.value.text = response?.body?.message || 'An error occurred while updating the PriceLine'
                snackbar.value.color = 'error'
            } else {
                snackbar.value.text = `PriceLine '${props.priceLine.id}' updated successfully`
                snackbar.value.color = 'success'
            }
            snackbar.value.show = true
            emit('reload') // Let the parent know to reload data
        })
    } else {
        api.newPriceLine(props.priceLine).then((result) => {
            snackbar.value.text = `PriceLine '${props.priceLine.id}' created successfully`
            snackbar.value.color = 'success'

        }).catch((err) => {

            snackbar.value.text = response?.body?.message || 'An error occurred while creating the PriceLine'
            snackbar.value.color = 'error'
        })
        snackbar.value.show = true
        emit('reload') // Let the parent know to reload data
    }
}
</script>

<style scoped>
/* Simple styling as needed, or remove entirely */
</style>