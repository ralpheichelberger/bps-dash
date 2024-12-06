<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
    </template>

    <v-app-bar-title>Geräte</v-app-bar-title>
    <v-btn @click="newWasher" elevation="5">Neu</v-btn>
  </v-app-bar>
  <v-container class="sticky-filters">
    <v-row no-gutters>
      <v-col order="first">
        <v-select v-model="shop" label="Shop" :items="locations" variant="underlined"
          @update:modelValue="fetchDevices"></v-select>
      </v-col>
    </v-row>
    <v-radio-group v-model="typeOption" inline>
      <v-radio :value="type" v-for="type in uniqueTypes" :label="type"></v-radio>
    </v-radio-group>
  </v-container>
  <v-container class="devices-list">
    <Device v-for="device in filterDevicesByType()" :device="device" @delete-device="deleteDevice(device.alias)" />
  </v-container>
  <v-container>
    <PumpEdit :washer="washer" :editing="true" :emit="$emit" v-model:dialog="dialog" />
  </v-container>
</template>
<style scoped>
.sticky-filters {
  position: sticky;
  top: 64px;
  /* Height of the v-app-bar */
  z-index: 1;
  background-color: black;
  /* Match with your app's background */
  padding: 16px 0;
}

.devices-list {
  padding-bottom: 56px;
  padding-bottom: 60px;
}
</style>
<script setup>
import * as bps from '../bpsclient';

import { ref, watch } from 'vue'
import Device from './Device.vue'
import PumpEdit from './PumpEdit.vue'

var client=new bps.ApiClient();
var api = new bps.DefaultApi(client);
var shop = ref('')
var pumps = ref([])
var washer = ref([])
var locations = ref([])
var uniqueTypes = ref([])
var typeOption = ref('washer')
const dialog = ref(false)
const fetchDevices = (all) => {
  var opts = Object();
  opts.location = all == "all" ? null : shop.value
  api.getPumprelays(opts).then((error,data,response)=>{
    if (error) {
      console.error(error);
    } else {
      pumps.value = data;
    }
  }).catch((error)=>{
    alert(error);
  });
}
const filterDevicesByType = () => {
  return pumps.value.filter(device => device.type === typeOption.value);
}
const deleteDevice = (devicealias) => {
  alert("device " + devicealias + " deleted! (not really)")
}
fetchDevices('all')
const newWasher = () => {
  washer.value = {
    id: "",
    priceLine: "",
    module: {
      mac: "",
      binaryType: "",
      lastSeen: 0,
      lastPing: 0,
      relayDuration: {
        self: 0, 
        detergent: 0, 
        softener: 0,
      },
    },
    detergent: {
      id: "",
      nr: 0,
      timestamp: 0,
      count: 0,
    },
    softener: {
      id: "",
      nr: 0,
      timestamp: 0,
      count: 0,
    },
    status: {
      timestamp: 0,
      allowStart: true,
      busy: false,
      wantDetergent: false,
      wantSoftener: true,
    },
  }
  dialog.value = true;
};

</script>
