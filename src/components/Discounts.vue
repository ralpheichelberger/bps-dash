<template>

    <v-card>
        <v-card-title :elevation="2">
            <v-sheet class="d-flex justify-space-between">
                <v-app-bar-title>Preis Kategorien
                    <v-icon @click="reload" class="btn btn-primary">mdi-reload</v-icon>
                </v-app-bar-title>
                <v-btn @click="newItem" elevation="5">Neu</v-btn>
            </v-sheet>
        </v-card-title>
        <v-card-text>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-right">
                            Prozent
                        </th>
                        <th class="text-left">
                            Rabattname
                        </th>
                        <th class="text-left">
                            Marketing Code
                        </th>
                        <th class="text-left">
                            Locations
                        </th>
                        <th class="text-left">
                            Von
                        </th>
                        <th class="text-left">
                            Bis
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in discounts" :key="item.id"
                        @click="discount = Object.assign({}, item); discountEdit = true; update = true">
                        <td>{{ item.id }}</td>
                        <td class="text-right">{{ item.percentage }}</td>
                        <td class="text-left">{{ item.name }}</td>
                        <td class="text-left">{{ item.code }}</td>
                        <td class="text-left">{{ locationList(item) }}</td>
                        <td class="text-left">{{ toDate(item.from) }}</td>
                        <td class="text-left">{{ toDate(item.to) }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>
    <v-dialog id="price-line-edit-dialog" v-model="discountEdit" max-width="800px">
        <DiscountEdit :discount="discount" :locations="locations" :update="update" @close="discountEdit = false" @save="saveChanges"
            @delete="deleteItem" />
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDiscount } from '../composables/useDiscount';
const { discounts, getDiscounts, updateDiscount, deleteDiscount, newDiscount } = useDiscount()
const discount = ref(null)
const discountEdit = ref(false)
const update = ref(false)

const props = defineProps({
    locations: {
        type: Array,
        default: () => [],
    },
})

// Simple snackbar state to display feedback
const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
})

const reload = () => {
    getDiscounts()
    discountEdit.value = false
}
reload()

const newItem = () => {
    update.value = false
    discount.value = {
        id: '',
        percentage: 50,
    }
    discountEdit.value = true
}
const deleteItem = () => {
    if (confirm(`Do you really want to delete discount ${discount.value.id}?`)) {
        deleteDiscount(discount.value).then((result) => {
            snackbar.value.text = `discount ${discount.value.id} deleted successfully`
            snackbar.value.color = 'success'
            snackbar.value.show = true
            reload()
        }).catch((err) => {
            snackbar.value.text = err.response?.body?.message || 'An error occurred while deleting the discount'
            snackbar.value.color = 'error'
            snackbar.value.show = true
        })
    }
}
const saveChanges = () => {
    if (update.value) {
        updateDiscount(discount.value).then((result) => {
            snackbar.value.text = `discount ${discount.value.id} updated successfully`
            snackbar.value.color = 'success'
            reload()
        }).catch((err) => {
            snackbar.value.text = err.response?.body?.message || 'An error occurred while updating the discount'
            snackbar.value.color = 'error'
            snackbar.value.show = true
        })
    } else {
        newDiscount(discount.value).then((result) => {
            snackbar.value.text = `discount '${discount.value.id}' created successfully`
            snackbar.value.color = 'success'
            reload()
        }).catch((err) => {

            snackbar.value.text = err.response?.body?.message || 'An error occurred while creating the discount'
            snackbar.value.color = 'error'
        })
        snackbar.value.show = true
    }
}
const locationList = (item) => {
    if (item.locations) {
        return item.locations.join(', ')
    }
    return 'All'
}
const toDate = (timestamp) => {
    if (timestamp) {
        return new Date(timestamp*1000).toISOString().split('T')[0]
    }
    return ''
}
</script>
