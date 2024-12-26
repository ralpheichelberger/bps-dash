<template> <!-- //FIXME change framework to vuestic? -->
    <v-sheet style="height: 100vh;">
        <v-card>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="devices">Geräte</v-tab>
                <v-tab value="prices">Preise</v-tab>
                <v-tab value="locations">Shops</v-tab>
                <v-tab value="programm">Modul Progamme</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="devices">
                        <Devices></Devices>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="prices">
                        <PriceLines></PriceLines>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="locations">
                        <Locations></Locations>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="programm">
                        <moduleProgramm></moduleProgramm>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
        <v-footer></v-footer>
    </v-sheet>
</template>
<script setup>
import { ref } from 'vue'
import Locations from './Locations.vue'
import PriceLines from './PriceLines.vue';
import Devices from './Devices.vue'
import moduleProgramm from './ModuleProgramm.vue';

const tab = ref('devices')

</script>
<style></style>