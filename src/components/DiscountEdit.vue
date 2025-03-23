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
            <!-- only display locactionArray not editable -->
            <v-text-field id="discount-locations" v-model="locationArray" label="Locations"  @click="openLocations">
                <!-- <template v-slot:append>
                    <v-btn icon="mdi-pencil" @click="openLocations"></v-btn>
                </template> -->
            </v-text-field>
            <!-- time from to -->
            <v-row>
                <v-col cols="6">
                    <v-text-field id="discount-from" v-model="discount.from" label="Von" type="date" required />
                </v-col>
                <v-col cols="6">
                    <v-text-field id="discount-to" v-model="discount.to" label="Bis" type="date" required />
                </v-col>
            </v-row>
            <v-textarea id="discount-userinfo" label="Kundeninformation" auto-grow v-model="discount.userinfo" />
            <v-text-field id="discount-info" v-model="discount.info" label="Info" />
        </v-card-text>
    </v-card>
    <v-dialog v-model="locationsDialog" class="ma-3" elevation="10">
        <!--list of all locations with a check box right if  the customer has it attached-->
        <v-card>
            <v-table>
                <thead>
                    <tr>
                        <th>Locations</th>
                        <th class="text-right">Addresse</th>
                        <th>Attached</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="location in locations" :key="location.id">
                        <td>{{ location.id }}</td>
                        <td class="text-right">{{ location.address }}</td>
                        <td>
                            <v-checkbox v-model="discount.locations" :value="location.id"></v-checkbox>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="locationsDialog = false">
            Okay
            </v-btn>
        </v-card-actions>
    </v-dialog>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useDiscount } from '../composables/useDiscount.js'
const props = defineProps({
    discount: {
        type: Object,
        default: () => ({}),
    },
    update: {
        type: Boolean,
        default: false,
    },
    locations: {
        type: Array,
        default: () => [],
    },
})
const openLocations = () => {
    if (!props.discount.locations) props.discount.locations = []
    locationsDialog.value = true
    console.dir(props.discount)
}
const locationsDialog = ref(false)
const locationArray = computed(() => {
    if (props.discount && props.discount.locations) {
        return props.discount.locations.join(", ")
    }
    return "Alle";
});

// Emitted events
const emit = defineEmits(['close', 'delete', 'save'])
import { onMounted } from 'vue'

onMounted(() => {
    if (props.discount) {
        if (props.discount.from) {
            props.discount.from = new Date(props.discount.from * 1000).toISOString().split('T')[0]
        }
        if (props.discount.to) {
            props.discount.to = new Date(props.discount.to * 1000).toISOString().split('T')[0]
        }
    }
})
const saveChanges = () => {
    // convert from and to unix timestamp
    props.discount.from = new Date(props.discount.from).getTime() / 1000
    props.discount.to = new Date(props.discount.to).getTime() / 1000
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
