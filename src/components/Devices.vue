<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
    </template>

    <v-app-bar-title>Geräte</v-app-bar-title>
    <v-btn @click="newDevice" elevation="5">Neu</v-btn>
  </v-app-bar>
  <v-container class="sticky-filters">
    <!-- <v-row no-gutters>
      <v-col order="first">
        <v-select v-model="shop" label="Shop" :items="locations" variant="underlined"
          @update:modelValue="fetchDevices"></v-select>
      </v-col>
    </v-row>
    <v-radio-group v-model="typeOption" inline>
      <v-radio :value="type" v-for="type in deviceTypes" :label="type"></v-radio>
    </v-radio-group> -->
  </v-container>
  <v-container class="devices-list">
    <Device v-for="device in filterDevicesByType()" :device="device" @delete-device="deleteDevice(device.alias)" />
  </v-container>
  <v-container>
    <WasherEdit :device="device" :locations="locations" :deviceTypes="deviceTypes" :editing="true" :emit="$emit"
      v-model:dialog="deviceEdit" />
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
import WasherEdit from './DeviceEdit.vue'

var client = new bps.ApiClient();
var api = new bps.DefaultApi(client);
var shop = ref('')
var devices = ref([])
var device = ref()
var locations = ref(['AH','BX','FW','MW'])
var deviceTypes = ref(['washer', 'dryer', 'pump'])
var typeOption = ref('washer')
const deviceEdit = ref(false)
const fetchDevices = (all) => {
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      devices.value = data;
      // deviceTypes.value = [...new Set(devices.value.map(device => device.type))];
      // deviceTypes.value.sort()
      // if (all == "all") {
      //   locations.value = [...new Set(devices.value.map(device => device.location))];
      //   locations.value.sort()
      //   devices.value = []
      // }
    }
  };
  var opts = Object();
  opts.location = ""
  api.getDevices(opts, callback);
}
const filterDevicesByType = () => {
  return devices.value //.filter(device => true) //device.type === typeOption.value);
}
const deleteDevice = (devicealias) => {
  alert("device " + devicealias + " deleted! (not really)")
}
fetchDevices('all')
const newDevice = () => {
  device.value = {
    type: "",
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
  deviceEdit.value = true;
};
</script>