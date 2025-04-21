<template>
	<v-card v-if="device">
		<v-card-actions>
			<v-btn icon="mdi-close" @click="emit('close')"></v-btn>
			<v-spacer></v-spacer>
			<v-btn id="delete" color="error" :disabled="!update" text="Delete" variant="plain"
				@click="emit('delete-device')"></v-btn>
			<v-btn id="outoforder" :text="deviceActive ? 'disable' : 'activate'" variant="plain"
				@click="setOutOfOrder"></v-btn>
				<v-btn id="save" color="primary" text="Save" variant="outlined" elevation="5" @click="saveChanges"></v-btn>
</v-card-actions>
			<v-card-actions>
				<v-btn id="update" :color="updateColor(device.module.updatestatus)" :text="'Update Status: '+device.module.updatestatus" variant="plain" @click="updateFirmware"></v-btn>
			</v-card-actions>
		<v-card-title>
			<span v-if="!deviceActive" style="color:red">
				OUT OF ORDER
			</span>
			<v-row dense>
				<v-combobox id="device_type" v-model="device.typ" :items="deviceTypes" label="Device type" required
					hide-details>
				</v-combobox>
			</v-row>
		</v-card-title>
		<v-card-text v-if="device.typ">
			<v-row dense>
				<v-col cols="12" class="d-flex align-center">
					<v-select v-if="locationItems" id="location" v-model="device.location" label="Location" required
						:items="locationItems" @update:modelValue="fetchLocationDevices"></v-select>
				</v-col>
				<v-col cols="12">
					<v-text-field id="device-id" type="number" v-model.number="device.id" :disabled="!update"
						label="Device ID" required>
					</v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field id="device-nr" type="number" v-model.number="device.nr" :disabled="disabled"
						@change="update_pump_relays" label="Device Nummer" required>
					</v-text-field>
				</v-col>
			</v-row>
			<v-row class="mb-4" dense>
				<v-col cols="12">
					<v-text-field id="mac" v-model="device.module.mac" :disabled="disabled" label="MAC" required
						hide-details></v-text-field>
				</v-col>
				<v-col v-if="(device.typ == 'washer' || device.typ == 'dryer') && priceLines" cols="12">
					<v-select id="price" v-model="device.priceLine" :disabled="disabled" label="Price line" required
						hide-details :items="priceLinesItems"></v-select>
				</v-col>
				<v-col v-if="device.typ != 'pump' && device.typ != 'dryer'" cols="12">
					<v-text-field id="moduleDuration" type="number" v-model.number="device.module.durations.impuls"
						:disabled="disabled" label="Impuls Duration" required hide-details></v-text-field>
				</v-col>
			</v-row>
			<v-card v-if="device.typ == 'washer'"> <!-- only show if device is a washer -->
				<v-card-title>Detergent</v-card-title>
				<v-row dense>
					<v-col cols="12">
						<v-select id="detergentname" v-model.number="device.detergent.id" :disabled="disabled"
							label="Modul name" required hide-details :items="availablePumpRelays">
						</v-select>
					</v-col>
					<v-col cols="12">
						<v-text-field id="detergentnr" type="number" v-model.number="device.detergent.nr"
							:disabled="disabled" label="Detergent Relay Number" required hide-details></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field id="detergentmoduleDuration" type="number"
							v-model.number="device.module.durations.detergent" :disabled="disabled"
							label="Detergent Relay Duration" required hide-details></v-text-field>
					</v-col>
				</v-row>
				<v-card-title>Softener</v-card-title>
				<v-row dense>
					<v-col cols="12">
						<v-select id="softenername" v-model.number="device.softener.id" :disabled="disabled"
							label="Modul name" required hide-details :items="availablePumpRelays">
						</v-select>
					</v-col>
					<v-col cols=" 12">
						<v-text-field id="softenernr" type="number" v-model.number="device.softener.nr"
							:disabled="disabled" label="Softener Relay Number" required hide-details></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field id="softenermoduleDuration" type="number"
							v-model.number="device.module.durations.softener" :disabled="disabled"
							label="Softener Relay Duration" required hide-details></v-text-field>
					</v-col>
				</v-row>
			</v-card>
		</v-card-text>
	</v-card>
	<v-snackbar v-model="snackbar.show" :color="snackbar.color">
		{{ snackbar.text }}
	</v-snackbar>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import * as bps from '../bpsclient';
import { useDevices } from '@/composables/useDevices';
import { useAPI } from '@/composables/useAPI';
import { de } from 'vuetify/locale';
const { priceLines, getPriceLines ,sendUpdateCommand} = useAPI()

const { devices, getDevices, updateDevice, newDevice,
	deviceInfo, getDeviceInfo, setDeviceOutOfOrder, setDeviceAvailable } = useDevices()
const deviceActive = ref(true)
const updateColor = (status) => {
	switch (status) {
		case 'done':
			return 'success'
		case 'outdated':
			return 'warning'
		default:
			return 'error'
	}
}
const updateFirmware = () => {
	if (confirm('Are you sure you want to update the firmware of this device?')) {
		sendUpdateCommand(props.device.id).then(() => {
			snackbar.value.text = `Device ${props.device.nr} firmware update started`
			snackbar.value.color = 'success'
			snackbar.value.show = true
		}).catch((error) => {
			snackbar.value.text = error || 'An error occurred while updating the firmware'
			snackbar.value.color = 'error'
			snackbar.value.show = true
		});
	}
	setTimeout(() => {
		emit('close')
	}, 3000)
}
const setOutOfOrder = () => {
	if (confirm('Are you sure you want to set this device ' + (deviceActive.value ? 'out of order?' : 'active?'))) {
		if (deviceActive.value) {
			setDeviceOutOfOrder(props.device.id).then(() => {
				updateDeviceInfo()
				snackbar.value.text = `Device ${props.device.nr} set out of order`
				snackbar.value.color = 'success'
				snackbar.value.show = true
			}).catch((error) => {
				snackbar.value.text = error || 'An error occurred while setting the device out of order'
				snackbar.value.color = 'error'
				snackbar.value.show = true
			});
		} else {
			setDeviceAvailable(props.device.id).then(() => {
				updateDeviceInfo()
				snackbar.value.text = `Device ${props.device.nr} set active`
				snackbar.value.color = 'success'
				snackbar.value.show = true
			}).catch((error) => {
				snackbar.value.text = error || 'An error occurred while setting the device active'
				snackbar.value.color = 'error'
				snackbar.value.show = true
			});
		}
	}
}

getPriceLines()
const snackbar = ref({ color: 'success', text: 'gespeichert', show: false })
const props = defineProps({
	device: Object,
	locations: Array,
	deviceTypes: Array,
	update: Boolean,
})
const updateDeviceInfo = () => {
	getDeviceInfo(props.device.id).then(() => {
		deviceActive.value = deviceInfo.value.state != 'outoforder'
	})
}
updateDeviceInfo()
const update_pump_relays = () => {
	if (props.device.detergent.nr === 0) {
		props.device.detergent.nr = props.device.nr
	}
	if (props.device.softener.nr === 0) {
		props.device.softener.nr = props.device.nr
	}
}
const emit = defineEmits(['reload', 'close', 'delete-device'])

const locationItems = ref([])
props.locations.forEach(element => {
	locationItems.value.push({
		title: element.id,
		props: { subtitle: element.address },
	})
});
const disabled = ref(false)
const update_disabled = () => {
	disabled.value = props.device.location ? false : true
}
watch(() => props.device?.location, update_disabled)

const saveChanges = () => {
	if (props.update) {
		updateDevice(props.device).then((data) => {
			snackbar.value.text = `Device ${props.device.nr} for location ${props.device.location} saved`
			snackbar.value.color = 'success'
			snackbar.value.show = true
		}).catch((error) => {
			snackbar.value.text = error.response?.body?.message || error || 'An error occurred while saving the device'
			snackbar.value.color = 'error'
			snackbar.value.show = true
		});
	} else {
		newDevice(props.device).then((data) => {
			snackbar.value.text = `Device ${props.device.nr} for location ${props.device.location} saved`
			snackbar.value.color = 'success'
			snackbar.value.show = true
		}).catch((error) => {
			snackbar.value.text = error.response?.body?.message ||  error || 'An error occurred while saving the device'
			snackbar.value.color = 'error'
			snackbar.value.show = true
		});
	}
	emit('reload')
}
const availablePumpRelays = ref([])
const fetchLocationDevices = () => {
	getDevices(props.device.location).then(() => {
		availablePumpRelays.value = devices.value.filter(device => device.typ === 'pump').map(device => device.nr)
	})
}
fetchLocationDevices()
const priceLinesItems = ref([])

watch(priceLines, (priceLines) => {
	priceLinesItems.value = priceLines.map((item) => {
		return {
			title: item.id,
			props: {
				subtitle: item.price
			},
		}
	})
})

</script>
