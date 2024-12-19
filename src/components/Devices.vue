<template>
  <v-card>
    <v-card-title :elevation="2">
      <v-sheet class="d-flex justify-space-between">
        <v-app-bar-title>Geräte</v-app-bar-title>
        <v-select id="loc" v-model="loc" label="Location" required :items="locationItems"
        @update:modelValue="getDevices(loc)" </v-select>
          <v-btn @click="newDevice" elevation="5">Neu</v-btn>
      </v-sheet>
    </v-card-title>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
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
          <tr v-for="item in devices" :key="item.id" @click="device = Object.assign({}, item); deviceEdit = true; updateDevice = true">
            <td>{{ deviceName(item) }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.priceLine }}</td>
            <td>{{ item.module.mac }}</td>
            <td>todo</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>

    <v-container v-if="locations">
      <DeviceEdit :device="device" :locations="locations" :deviceTypes="deviceTypes" :editing="true" :update="updateDevice" @reload="getDevices(loc)"
        v-model:dialog="deviceEdit" />
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import DeviceEdit from './DeviceEdit.vue'
import { useAPI } from '@/composables/useAPI';
import { useDevices } from '@/composables/useDevices';
const { devices, getDevices } = useDevices()
const { locations, getLocations } = useAPI()
const loc = ref(null)
var deviceTypes = ref(['washer', 'dryer', 'pump']) // deliberately hard-coded
var device = ref()
const deviceEdit = ref(false)
const updateDevice = ref(false)
const locationItems = ref([])
const deviceName = (item) => {return item?.location + item?.type.charAt(0).toUpperCase() + item?.id}
watch(locations, (locations) => {
  locationItems.value = locations.map((item) => {
    return {
      title: item.id,
      props: {
        subtitle: item.address
      },
    }
  })
})



getLocations()


const deleteDevice = (devicealias) => {
  alert("device " + devicealias + " deleted! (not really)")
}

const newDevice = () => {
  device.value = {
    type: "",
    id: "",
    price_line: "",
    location: loc,
    module: {
      mac: "",
      binaryType: "",
      lastSeen: 0,
      lastPing: 0,
      moduleDuration: {
        self: 0,
        detergent: 0,
        softener: 0,
      },
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
</script>