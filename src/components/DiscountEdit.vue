<template>
    <v-card v-if="discount">
        <v-card-actions>
            <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="error" @click="deleteItem">
                Delete
            </v-btn>
            <v-btn color="primary" text @click="saveChanges">
                Save
            </v-btn>
        </v-card-actions>

        <!-- Title -->
        <v-card-title>
            Edit Discount
        </v-card-title>

        <!-- Fields -->
        <v-card-text>
            <v-text-field id="discount-id" v-model="discount.id" label="ID" :disabled="update" required />
            <v-text-field id="discount-price" v-model.number="discount.percentage" label="Prozent" type="number"
                required />
            <v-text-field id="discount-name" v-model="discount.name" label="Rabattname" required />
            <v-text-field id="discount-code" v-model="discount.code" label="Marketing Code" />
            <v-textarea id="discount-userinfo" label="Kundeninformation" auto-grow v-model="discount.userinfo" />
            <v-text-field id="discount-info" v-model="discount.info" label="Info" />
        </v-card-text>
    </v-card>


</template>

<script setup>
const props = defineProps({
    discount: {
        type: Object,
        default: () => ({}),
    },
    update: {
        type: Boolean,
        default: false,
    },
})

// Emitted events
const emit = defineEmits(['close', 'delete', 'save'])

const saveChanges = () => {
    emit('save')
    emit('close')
}
const deleteItem = () => {
    if (!confirm('Are you sure you want to delete this item?')) {
        return
    }
    emit('delete')
    emit('close')
}
</script>
