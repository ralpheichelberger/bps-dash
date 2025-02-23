<template>

    <v-card>
        <v-card-title :elevation="2">
            <v-sheet class="d-flex justify-space-between">
                <v-app-bar-title>Preis Kategorien</v-app-bar-title>
                <v-btn @click="newPriceline" elevation="5">Neu</v-btn>
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
                            Preis / EUR
                        </th>
                        <th class="text-right">
                            Dauer Waschmittel
                        </th>
                        <th class="text-right">
                            Dauer Weichspüler
                        </th>
                        <th class="text-right">
                            Trockner Einheiten
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in priceLines" :key="item.id"
                        @click="priceLine = Object.assign({}, item); priceLineEdit = true; update = true">
                        <td>{{ item.id }}</td>
                        <td class="text-right">{{ cent2euro(item.price) }}</td>
                        <td class="text-right">{{ item.duration_detergent }}</td>
                        <td class="text-right">{{ item.duration_softener }}</td>
                        <td class="text-right">{{ item.dryerunits }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>
    <v-dialog id="price-line-edit-dialog" v-model="priceLineEdit" max-width="800px">
        <PriceLineEdit :priceLine="priceLine" :update="update" @close="priceLineEdit = false" @save="saveChanges"
            @delete="deletePrice" />
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI';
import PriceLineEdit from './PriceLineEdit.vue'

const { newPriceLine, priceLines, getPriceLines, deletePriceLine, updatePriceLine, cent2euro } = useAPI()
const priceLine = ref(null)
const priceLineEdit = ref(false)
const update = ref(false)
// Simple snackbar state to display feedback
const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
})

const reload = () => {
    getPriceLines()
    priceLineEdit.value = false
}
getPriceLines()

const newPriceline = () => {
    update.value = false
    priceLine.value = {
        id: '',
        price: 0,
        dryerunits: null,
        duration_detergent: null,
        duration_softener: null,
    }
    priceLineEdit.value = true
}
const deletePrice = () => {
    if (confirm(`Do you really want to delete PriceLine ${priceLine.value.id}?`)) {
        deletePriceLine(priceLine.value).then((result) => {
            snackbar.value.text = `PriceLine ${priceLine.value.id} deleted successfully`
            snackbar.value.color = 'success'
            snackbar.value.show = true
            reload()
        }).catch((err) => {
            snackbar.value.text = err.response?.body?.message || 'An error occurred while deleting the PriceLine'
            snackbar.value.color = 'error'
            snackbar.value.show = true
        })
    }
}
const saveChanges = () => {
    if (update.value) {
        updatePriceLine(priceLine.value).then((result) => {
            snackbar.value.text = `PriceLine ${priceLine.value.id} updated successfully`
            snackbar.value.color = 'success'
            reload()
        }).catch((err) => {
            snackbar.value.text = err.response?.body?.message || 'An error occurred while updating the PriceLine'
            snackbar.value.color = 'error'
            snackbar.value.show = true
        })
    } else {
        newPriceLine(priceLine.value).then((result) => {
            snackbar.value.text = `PriceLine '${priceLine.value.id}' created successfully`
            snackbar.value.color = 'success'
            reload()
        }).catch((err) => {

            snackbar.value.text = err.response?.body?.message || 'An error occurred while creating the PriceLine'
            snackbar.value.color = 'error'
        })
        snackbar.value.show = true
    }
}

</script>
