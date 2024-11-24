<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">

      <v-row>
        <v-col cols="10">
          <v-card class="py-5" color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
             rounded="lg" variant="outlined">
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold"> {{ device.location }} {{ device.name }}</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                {{ device }}
              </div>
            </template>

            <v-overlay opacity=".12" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>



      </v-row>
    </v-responsive>
  </v-container>
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
var device = ref(new bps.Device())
var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.dir(data)
    device.value=data;
  }
};
var result = api.getDevice("S1W3", callback);
console.dir(result);
</script>
