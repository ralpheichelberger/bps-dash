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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in priceLines" :key="item.id"
                        @click="priceLine = Object.assign({}, item); priceLineEdit = true; updatePriceLine = true">
                        <td>{{ item.id }}</td>
                        <td class="text-right">{{ cent2euro(item.price) }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>
    <v-dialog id="price-line-edit-dialog" v-model="priceLineEdit" max-width="800px">
        <PriceLineEdit :priceLine="priceLine" :update="updatePriceLine" @close="priceLineEdit = false" @save="newPriceLines(priceLine)"
            @reload="reload"  />
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI';
import PriceLineEdit from './PriceLineEdit.vue'
const { newPriceLine, priceLines, getPriceLines, cent2euro } = useAPI()
const priceLine = ref(null)
const priceLineEdit = ref(false)
const updatePriceLine = ref(false)

const reload = () =>  {
    getPriceLines()
    priceLineEdit.value = false
}
getPriceLines()
const newPriceLines = (priceLine) => {
    newPriceLine(priceLine).then(() => getPriceLines())
}
const newPriceline = () => {
    priceLine.value = {
        id: '',
        price: 0,
    }
    priceLineEdit.value = true
}
</script>
