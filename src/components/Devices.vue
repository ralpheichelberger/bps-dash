<template>
  <v-card>
    <v-card-actions>
      <v-icon @click="reload" class="btn btn-primary">mdi-reload</v-icon>
      <v-select id="loc" v-model="loc" label="Location" required :items="locationItems" @update:modelValue="reload" />
      <v-btn style="margin:0 .2rem" :disabled="!loc" @click="updateDialog = true">Update </v-btn>
      <v-btn @click="createNewDevice" elevation="5">Neu</v-btn>
    </v-card-actions>

    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left" @click="sort('deviceName')">Maschinen</th>
            <th class="text-left" @click="sort('status')">Status</th>
            <th class="text-left" @click="sort('last_seen')">Seit</th>
            <th class="text-left" @click="sort('updatestatus')">Update</th>
            <th class="text-left" @click="sort('module.firmware')">firmware</th>
            <th class="text-left" @click="sort('priceLine')">Preiskategorie</th>
            <th class="text-left" @click="sort('id')">ID</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in devices" :key="item.id">
            <tr @click="device = Object.assign({}, item); deviceEdit = true; updateDevice = true">
              <td>{{ deviceName(item) }}</td>
              <td :style="{ color: item.status.offline ? 'red' : item.status.busy ? 'green' : item.status.allow_start ? 'orange' : 'lightblue' }">
                {{ item.status.offline ? 'offline' : item.status.busy ? 'running' : item.status.allow_start ? 'paid' : 'free' }}
              </td>
              <td>{{ lastSeenSince(item) }}</td>
              <td :style="{
                color: item.module.updatestatus === 'done' ? 'green' : item.module.updatestatus === 'start' ? 'lightblue' : item.module.updatestatus === 'inprogress' ? 'orange' : 'red'
              }">
                {{ item.module.updatestatus }}
              </td>
              <td>{{ item.module.firmware ? item.module.firmware.slice(0, 12) : '' }}</td>
              <td>{{ item.priceLine }}</td>
              <td>{{ item.id }}</td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card-text>

    <v-container v-if="props.locations">
      <v-dialog id="washer-edit-dialog" v-model="deviceEdit" max-width="800px">
        <DeviceEdit :device="device" :locations="locations" :deviceTypes="deviceTypes" @close="deviceEdit = false"
          :update="updateDevice" @reload="reload" @delete-device="delDevice(device)" />
      </v-dialog>
    </v-container>
  </v-card>

  <v-dialog id="updateDevicesDialog" v-model="updateDialog" max-width="400px">
    <v-card>
      <v-card-actions>
        <v-text-field label="Typ" type="text" name="typ" v-model="devicetyp" />
        <v-btn @click="updateDialog = false">Abbrechen</v-btn>
        <v-btn style="margin: 0 .6rem" @click="updateLocationDevices">Starten</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color">
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import DeviceEdit from './DeviceEdit.vue'
import { useDevices } from '@/composables/useDevices';
import { useAPI } from '@/composables/useAPI';
import { Module } from "../bpsclient";

const { sendUpdateCommand } = useAPI()
const { devices, getDevices, deleteDevice } = useDevices()
const loc = ref(null)
const devicetyp = ref(null)
const props = defineProps({ locations: Array, deviceTypes: Array, newDevice: String })
const device = ref()
const deviceEdit = ref(false)
const updateDevice = ref(false)
const locationItems = ref([])
const from_time = ref(Math.floor(Date.now() / 1000) - 12 * 60 * 60)
const updateDialog = ref(false)
const snackbar = ref({ color: 'success', text: 'gespeichert', show: false })
const lastSort = ref('')

const deviceName = (item) => `${item?.location} / ${item?.typ.charAt(0).toUpperCase()} / ${item?.nr}`

const lastSeenSince = (item) => {
  const ts = item?.module?.last_seen || item?.module?.lastSeen
  if (ts > 0) {
    const elapsed = Math.floor(Date.now() / 1000) - ts
    if (elapsed < 60) return 'just now'
    if (elapsed < 3600) return `${Math.floor(elapsed / 60)} min`
    if (elapsed < 86400) return `${Math.floor(elapsed / 3600)} hours`
    return `${Math.floor(elapsed / 86400)} days`
  }
  return ''
}

const updateLocationDevices = () => {
  if (loc.value) {
    sendUpdateCommand(0, false, { location: loc.value, typ: devicetyp.value })
      .then(() => {
        snackbar.value = { text: `Devices ${loc.value} firmware update started`, color: 'success', show: true }
      })
      .catch((error) => {
        snackbar.value = { text: error || 'An error occurred while initiating the update', color: 'error', show: true }
      })
    updateDialog.value = false
  }
}

const createNewDevice = () => {
  device.value = {
    id: 0,
    typ: "washer",
    nr: 0,
    price_line: "washer_small",
    location: loc,
    module: {
      mac: "",
      binaryType: "washer",
      lastSeen: 0,
      lastPing: 0,
      durations: { impuls: 9000, detergent: 100, softener: 100 },
      updatestatus: Module.UpdatestatusEnum.start,
    },
    detergent: { id: 0, nr: 0, timestamp: 0, count: 0 },
    softener: { id: 0, nr: 0, timestamp: 0, count: 0 },
    status: { timestamp: 0, allowStart: true, busy: false, wantDetergent: false, wantSoftener: true },
  }
  deviceEdit.value = true
  updateDevice.value = false
}

const delDevice = (device) => {
  if (confirm(`Delete device ${device.nr} at location ${device.location}?`)) {
    deleteDevice({ location: device.location, typ: device.typ, nr: device.nr })
  }
  deviceEdit.value = false
}

const reload = () => {
  setTimeout(() => getDevices(loc.value, from_time.value), 300)
  lastSort.value = ''
}

const sort = (key) => {
  if (lastSort.value === key) {
    devices.value.reverse()
    lastSort.value = ''
  } else {
    devices.value.sort((a, b) => {
      let aVal = key === 'status'
        ? (a.status.offline ? 0 : a.status.busy ? 2 : a.status.allow_start ? 1 : 3)
        : key === 'last_seen'
        ? (a.module?.last_seen || a.module?.lastSeen || 0)
        : key === 'updatestatus'
        ? (a.module?.updatestatus || '')
        : key === 'deviceName'
        ? deviceName(a).toLowerCase()
        : a[key] || a.module?.[key] || ''

      let bVal = key === 'status'
        ? (b.status.offline ? 0 : b.status.busy ? 2 : b.status.allow_start ? 1 : 3)
        : key === 'last_seen'
        ? (b.module?.last_seen || b.module?.lastSeen || 0)
        : key === 'updatestatus'
        ? (b.module?.updatestatus || '')
        : key === 'deviceName'
        ? deviceName(b).toLowerCase()
        : b[key] || b.module?.[key] || ''

      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    })
    lastSort.value = key
  }
}

watchEffect(() => {
  if (props.locations) {
    locationItems.value = props.locations.map((item) => ({
      title: item.id,
      props: { subtitle: item.address }
    }))
  }
})

if (props.newDevice) {
  createNewDevice()
  device.value.module.mac = props.newDevice
  device.value.typ = "washer"
  deviceEdit.value = true
}
</script>
