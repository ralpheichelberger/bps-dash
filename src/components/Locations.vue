<template>
    <v-app-bar :elevation="2">
    <v-app-bar-title>Shops</v-app-bar-title>
    <v-btn @click="newLocation" elevation="5">Neu</v-btn>
  </v-app-bar>
  <v-card>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Adresse
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in locations" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.address }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI';
const { locations, getLocations } = useAPI()

getLocations()
const newLocation = () => {
  alert('todo')
}
</script>
