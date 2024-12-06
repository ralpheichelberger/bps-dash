<template>

    <!-- Dynamically display the selected component -->
    <component :is="tabs[currentTab]" />
    <!-- Bottom Navigation -->
    <v-bottom-navigation>
        <v-btn v-for="(_, tab) in tabs" :key="tab" :class="{ active: currentTab === tab }" @click="currentTab = tab">
            <v-icon v-if="tab === 'Devices'">mdi-washing-machine</v-icon>
            <v-icon v-if="tab === 'Accounts'">mdi-account-credit-card</v-icon>
            <v-icon v-if="tab === 'Doors'">mdi-door-closed-lock</v-icon>
            <span>{{ tab }}</span>
        </v-btn>
    </v-bottom-navigation>
</template>
<script setup>
import Shops from './Shops.vue'
import Washer from './Washers.vue'
import Pumps from './Pumps.vue'
import Accounts from './Accounts.vue'
import { ref } from 'vue'

// Reactive state to track the current tab
const currentTab = ref('Devices')

// Object to map tab names to components
const tabs = {
    Shops,
    Washer,
    Accounts,
    Pumps
}
</script>