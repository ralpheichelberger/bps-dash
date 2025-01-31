<template> 
    <v-sheet style="height: 100vh;">
        <v-card v-if="locations">
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="devices">Geräte</v-tab>
                <v-tab value="prices">Preise</v-tab>
                <v-tab value="locations">Shops</v-tab>
                <v-tab value="programm">Modul Progamme</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="devices">
                        <Devices :device-types="deviceTypes" :locations="locations" :newDevice="newDeviceMac"></Devices>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="prices">
                        <PriceLines></PriceLines>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="locations">
                        <Locations :locations="locations" @reloadLocations="reloadLoctions"></Locations>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="programm">
                        <moduleProgramm :device-types="deviceTypes"></moduleProgramm>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
        <v-empty-state v-else headline="Whoops, 401" title="Unauthorized"
            text="You have no clearance to access this page">
            <v-btn elevation="10" height="6rem" width="100%" style="font-size: x-large;"
                @click="handleOkClick">Hompage</v-btn>
        </v-empty-state>

    </v-sheet>

</template>
<script setup>
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI';
const { locations, getLocations } = useAPI()
import Locations from './Locations.vue'
import PriceLines from './PriceLines.vue';
import Devices from './Devices.vue'
import moduleProgramm from './ModuleProgramm.vue';
var deviceTypes = ref(['washer', 'dryer', 'pump']) // HARDCODED get from API

const tab = ref('devices')

const handleOkClick = () => {
    window.location.href = "/";
}
const reloadLoctions = () => {
    getLocations()
}
reloadLoctions()

let tabvalue='devices'

tab.value = tabvalue
const newDeviceMac=ref('')
//parameter newDeviceMac on URL 
const urlParams = new URLSearchParams(window.location.search);
newDeviceMac.value = urlParams.get('newDeviceMac') || '';

</script>
<style></style>