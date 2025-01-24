<template>
  <v-card>
    <v-card-title :elevation="2">
      <v-sheet class="d-flex justify-space-between">
        <v-app-bar-title>Geräte
          <v-icon @click="getDevices(loc)" class="btn btn-primary">mdi-reload</v-icon>
        </v-app-bar-title>
        <v-select id="loc" v-model="loc" label="Location" required :items="locationItems"
          @update:modelValue="getDevices(loc)" </v-select>
          <v-btn @click="createNewDevice" elevation="5">Neu</v-btn>
      </v-sheet><!-- // FIXME: show current shop address -->
    </v-card-title> <!-- //FIXME: add search -->
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Typ
            </th>
            <th class="text-left">
              Nr
            </th>
            <th class="text-left">
              Preiskat.
            </th>
            <th class="text-left">
              Modul MAC
            </th>
            <th class="text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in devices" :key="item.id"
            @click="device = Object.assign({}, item); deviceEdit = true; updateDevice = true">
            <td>{{ item.id }}</td>
            <td>{{ deviceName(item) }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.nr }}</td>
            <td>{{ item.priceLine }}</td>
            <td>{{ item.module.mac }}</td>
            <td>todo</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>

    <v-container v-if="props.locations">
      <v-dialog id="washer-edit-dialog" v-model="deviceEdit" max-width="800px">
        <DeviceEdit :device="device" :locations="locations" :deviceTypes="deviceTypes" :newDevice="newDevice"
          @close="deviceEdit = false" :update="updateDevice" @reload="getDevices(loc)"
          @delete-device="delDevice(device)" />
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import DeviceEdit from './DeviceEdit.vue'
import { useDevices } from '@/composables/useDevices';
import { Module } from "../bpsclient";

const { devices, getDevices, deleteDevice } = useDevices()
const loc = ref(null)
const props = defineProps({
  locations: Array,
  deviceTypes: Array,
  newDevice: String,
})
var device = ref()
const deviceEdit = ref(false)
const updateDevice = ref(false)
const locationItems = ref([])
const deviceName = (item) => { return item?.location +"/"+ item?.typ.charAt(0).toUpperCase() + item?.nr }
const createNewDevice = () => {
  device.value = {
    typ: "washer",
    nr: "",
    price_line: "washer_small",
    location: loc,
    module: {
      mac: "",
      binaryType: "washer", // FIXME: get from config
      lastSeen: 0,
      lastPing: 0,
      durations: {
        impuls: 9000, // 15 min FIXME: get from config
        detergent: 100,
        softener: 100,
      },
      updatestatus: Module.UpdatestatusEnum.start,
    },
    detergent: {
      id: 0,
      nr: 0,
      timestamp: 0,
      count: 0,
    },
    softener: {
      id: 0,
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
  updateDevice.value = false;
};
watchEffect(() => {
  if (props.locations) {
    locationItems.value = props.locations.map((item) => {
      return {
        title: item.id,
        props: {
          subtitle: item.address
        }
      }
    })
  }
})

if (props.newDevice) {
  createNewDevice()
  device.value.module.mac = props.newDevice
  device.value.typ = "washer"
  deviceEdit.value = true
}

const delDevice = (device) => {
  deleteDevice({ location: device.location, typ: device.typ, nr: device.nr })

  deviceEdit.value = false
}



</script>