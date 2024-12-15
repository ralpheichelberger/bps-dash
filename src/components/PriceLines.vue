<template>
    <v-app-bar :elevation="2">
    <v-app-bar-title>Preis Kategorien</v-app-bar-title>
    <v-btn @click="newPriceLines" elevation="5">Neu</v-btn>
  </v-app-bar>
  <v-card>
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
          <tr v-for="item in priceLines" :key="item.id">
            <td>{{ item.id }}</td>
            <td  class="text-right">{{ cent2euro(item.price) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI';
const { priceLines, getPriceLines ,cent2euro} = useAPI()

getPriceLines()
const newPriceLines = () => {
  alert('todo')
}
</script>
