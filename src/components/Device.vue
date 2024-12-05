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
    <WasherEdit :washer="device" :editing="editing" :panel="panel" :emit="emit" v-model:dialog="dialog" />

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
import WasherEdit from './WasherEdit.vue'
const props = defineProps(['device'])
const emit = defineEmits(['delete-device'])

var panel=ref([])
var editing = ref(false)
panel.value=["module","detergent","softener"]
var dialog=ref(false)
var busy = ref(props.device.status.door ? 'colorActive' : 'colorNotActive')
var detergent = ref(props.device.status.detergent ? 'colorActive': 'colorNotActive')
var softener = ref(props.device.status.softener ? 'colorActive' : 'colorNotActive')
var allowStart = ref(props.device.status.allowStart ? 'colorActive' : 'colorNotActive')
const edit = () => {
  dialog.value=true
}

</script>