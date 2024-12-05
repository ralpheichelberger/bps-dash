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
    <WasherEdit :washer="washer" :editing="true" :emit="$emit" v-model:dialog="dialog" />
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
import WasherEdit from './WasherEdit.vue'

var client=new bps.ApiClient();
var api = new bps.DefaultApi(client);
var shop = ref('')
var devices = ref([])
var washer = ref([])
var locations = ref([])
var uniqueTypes = ref([])
var typeOption = ref('washer')
const dialog = ref(false)
const fetchDevices = (all) => {
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      devices.value = data;
      uniqueTypes.value = [...new Set(devices.value.map(device => device.type))];
      uniqueTypes.value.sort()
      if (all == "all") {
        locations.value = [...new Set(devices.value.map(device => device.location))];
        locations.value.sort()
        devices.value = []
      }
    }
  };
  var opts = Object();
  opts.location = all == "all" ? null : shop.value
  api.getWashers (opts, callback);
}
const filterDevicesByType = () => {
  return devices.value.filter(device => device.type === typeOption.value);
}
const deleteDevice = (devicealias) => {
  alert("device " + devicealias + " deleted! (not really)")
}
fetchDevices('all')
const newWasher = () => {
  washer.value = {
    id: "test-id-001",
    priceLine: "test-price-line",
    module: {
      mac: "00:11:22:33:44:55",
      binaryType: "TestBinaryType",
      lastSeen: Date.now(),
      lastPing: Date.now() - 5000, // 5 seconds ago
      relayDuration: {
        self: 50, // Duration in 1/10 seconds (5 seconds)
        detergent: 100, // Duration in 1/10 seconds (10 seconds)
        softener: 70, // Duration in 1/10 seconds (7 seconds)
      },
    },
    detergent: {
      id: "detergent-pump-001",
      nr: 1,
      timestamp: Date.now(),
      count: 10,
    },
    softener: {
      id: "softener-pump-001",
      nr: 2,
      timestamp: Date.now(),
      count: 5,
    },
    status: {
      timestamp: Date.now(),
      allowStart: true,
      busy: false,
      wantDetergent: false,
      wantSoftener: true,
    },
  }
  dialog.value = true;
};

</script>
