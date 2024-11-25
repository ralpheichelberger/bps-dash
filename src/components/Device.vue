<template>
    <v-card @click="edit()" class="py-5 ma-2" rounded="lg" variant="outlined">
        <template #image>
            <v-img position="top right" />
        </template>
        <template #title>
            <v-row><v-col>
                    <h2 class="text-h5 font-weight-bold"> {{ device.location }} {{ device.name }}</h2>
                </v-col>
                <v-col><v-row>
                        <v-col>
                            <h2 class="text-h5 font-weight-bold" :class="[allowStart]">F</h2>
                        </v-col>
                        <v-col>
                            <h2 class="text-h5 font-weight-bold" :class="[busy]">B</h2>
                        </v-col>
                        <v-col>
                            <h2 class="text-h5 font-weight-bold" :class="[detergent]">D</h2>
                        </v-col>
                        <v-col>
                            <h2 class="text-h5 font-weight-bold" :class="[softener]">S</h2>
                        </v-col> </v-row>
                </v-col>
            </v-row>
            <p></p>
        </template>
        <v-overlay opacity=".12" contained model-value persistent />
    </v-card>

    <v-dialog v-model="dialog" max-width="600">


        <v-card>
        <v-card-title>
            <v-row dense><v-col><h2 class="text-h5 font-weight-bold">{{ device.alias}}</h2></v-col><v-col></v-col>
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn> </v-row>  </v-card-title>      
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                        <v-select v-model="device.location" :disabled="!editing" label="Location"
                            :items="['AH', 'BX', 'KS', 'MW', 'FW']"></v-select>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                        <v-text-field v-model="device.name" :disabled="!editing" label="Name" required></v-text-field>
                    </v-col>
                </v-row>

                <v-expansion-panels multiple>
                    <v-expansion-panel :title="'Modul ' + device.module.alias">
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.module.mac" :disabled="!editing" label="MAC"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.module.relayDuration" :disabled="!editing"
                                        label="Relais Dauer" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel title="Waschmittel">
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.detergent.pumpRelayId" :disabled="!editing"
                                        label="Relais Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-select v-model="device.detergent.location" :disabled="!editing" label="Location"
                                        :items="['AH', 'BX', 'KS', 'MW', 'FW']"></v-select>
                                </v-col>

                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.detergent.name" :disabled="!editing" label="Name"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.detergent.relayNumber" :disabled="!editing"
                                        label="Relais Nummer" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.detergent.pumpDuration" :disabled="!editing"
                                        label="Relais Dauer" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel title="Weichspüler">
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.softener.pumpRelayId" :disabled="!editing"
                                        label="Relais Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-select v-model="device.softener.location" :disabled="!editing" label="Location"
                                        :items="['AH', 'BX', 'KS', 'MW', 'FW']"></v-select>
                                </v-col>

                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.softener.name" :disabled="!editing" label="Name"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.softener.relayNumber" :disabled="!editing"
                                        label="Relais Nummer" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-text-field v-model="device.softener.pumpDuration" :disabled="!editing"
                                        label="Relais Dauer" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style>
.colorActive {
    color: rgb(0, 248, 0);
}

.colorNotActive {
    color: gray
}
</style>
<script setup>
import { ref } from 'vue'
const props = defineProps(['device'])
var device_status = ref()
var dialog = ref(false)
var editing = ref(false)
var busy = ref(props.device.status.door ? 'colorActive' : 'colorNotActive')
var detergent = ref(props.device.status.detergent ? 'colorActive': 'colorNotActive')
var softener = ref(props.device.status.softener ? 'colorActive' : 'colorNotActive')
var allowStart = ref(props.device.status.allowStart ? 'colorActive' : 'colorNotActive')

const edit = () => {
    props.device.module.mac = "dc:4a:3e:7c:8d:f9"
    dialog.value = true
}
</script>