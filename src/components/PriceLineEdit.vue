<template>
    <!-- Only show the card if priceLine is provided -->
    <v-card v-if="priceLine">
        <!-- Actions -->
        <v-card-actions>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
            <v-spacer></v-spacer>
            <!-- We emit a "delete" event if you want to handle deletion outside -->
            <v-btn text color="error" @click="deletePriceLine" >
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
            <v-text-field id="priceLine-duration_detergent" label="Duration Detergent" v-model.number="priceLine.duration_detergent"
                type="number" />
            <v-text-field id="priceLine-duration_softener" label="Duration Softener" v-model.number="priceLine.duration_softener" type="number" />
            <v-text-field id="priceLine-dryerunits" label="Dryer Units" v-model.number="priceLine.dryerunits" type="number" />
        </v-card-text>
    </v-card>


</template>

<script setup>
import { ref } from 'vue'

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
const emit = defineEmits(['close', 'delete','save'])

const saveChanges = () => {
    emit('save')
    emit('close')
}
const deletePriceLine = () => {
    emit('delete')
    emit('close')
}
</script>

