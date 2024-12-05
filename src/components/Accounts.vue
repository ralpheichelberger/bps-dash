<template>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Konten</v-app-bar-title>
    </v-app-bar>

</template>

<script setup>
import * as bps from '../bpsclient'; // Assuming the `bpsclient` folder is in the `src` directory
import { ref } from 'vue'
var defaultClient = bps.ApiClient.instance;
// Configure HTTP basic authorization: BasicAuth
var BasicAuth = defaultClient.authentications['BasicAuth'];
BasicAuth.username = 'ralph'
BasicAuth.password = 'APIpassword'

var api = new bps.DefaultApi()
// var device = ref(new bps.Device())
// var callback = function (error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.dir(data)
//     device.value=data;
//   }
// };
</script>
