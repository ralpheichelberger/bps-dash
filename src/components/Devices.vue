<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
    </template>

    <v-app-bar-title>Geräte</v-app-bar-title>
  </v-app-bar>
  <v-container>
    <v-row no-gutters>
      <v-col order="first">
        <v-select v-model="shop" label="Shop" 
            :items="['AH', 'BX', 'KS', 'MW', 'FW']" 
            variant="underlined"
             @update:modelValue="fetchDevices()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <Device v-for="device in devices" :device="device" />
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

const fetchDevices = () => {
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      devices.value = data;
    }
  };
  var opts = Object();
  opts.location = shop.value
  var result = api.getDevices(opts, callback);
}
</script>
