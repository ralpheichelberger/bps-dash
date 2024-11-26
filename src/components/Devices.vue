<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
    </template>

    <v-app-bar-title>Geräte</v-app-bar-title>
  </v-app-bar>
  <v-container>
    <v-row no-gutters>
      <v-col order="first">
        <v-select v-model="shop" label="Shop" :items="['AH', 'BX', 'KS', 'MW', 'FW']" variant="underlined"
          @update:modelValue="fetchDevices()"></v-select>
      </v-col>
    </v-row>
    <v-radio-group v-model="type" inline>
      <v-radio :value="type" v-for="type in uniqueTypes" :label="type"></v-radio>
    </v-radio-group>
  </v-container>
  <v-container>
    <Device v-for="device in filterDevicesByType()" :device="device" />
  </v-container>
</template>

<script setup>
import * as bps from '../bpsclient'; // Assuming the `bpsclient` folder is in the `src` directory
import { ref, watch } from 'vue'
import Device from './Device.vue'
var defaultClient = bps.ApiClient.instance;
var BasicAuth = defaultClient.authentications['BasicAuth'];
BasicAuth.username = 'ralph'
BasicAuth.password = 'APIpassword'

var api = new bps.DefaultApi()
var shop = ref('')
var devices = ref([])
var uniqueTypes = ref([])
var type=ref('washer')
const fetchDevices = () => {
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      devices.value = data;
      uniqueTypes.value = [...new Set(devices.value.map(device => device.type))];
      uniqueTypes.value.sort()
    }
  };
  var opts = Object();
  opts.location = shop.value
  var result = api.getDevices(opts, callback);
}
function filterDevicesByType() {
  return devices.value.filter(device => device.type === type.value);
}
</script>
