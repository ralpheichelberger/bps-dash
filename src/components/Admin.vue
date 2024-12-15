<template>
    <v-sheet style="height: 100vh;" >
        <v-carousel :show-arrows="false" delimiter-icon="mdi-square" height="100%" >
            <v-carousel-item>
                <Locations></Locations>
            </v-carousel-item>
            <v-carousel-item>
                <PriceLines></PriceLines>
            </v-carousel-item>
            <v-carousel-item>
                <Devices></Devices>
            </v-carousel-item>
        </v-carousel>
    </v-sheet>
</template>
<script setup>
import Locations from './Locations.vue'
import PriceLines from './PriceLines.vue';
import Devices from './Devices.vue'
// import Pumps from './Pumps.vue'
// import Accounts from './Accounts.vue'

</script>
<style>

</style>