<template>
	<v-dialog id="washer-edit-dialog" v-model="dialog">
		<v-card v-if="device">
			<v-card-actions>
				<v-btn icon="mdi-close" @click="dialog = false"></v-btn>
				<v-spacer></v-spacer>
				<!-- <v-btn id="delete" text="Delete" variant="plain" @click="emit('delete-device')"></v-btn> -->
				<!-- <v-btn id="close" text="Close" variant="plain" @click="dialog = false"></v-btn> -->
				<v-btn id="save" color="primary" text="Save" variant="tonal" @click="saveChanges"></v-btn>
			</v-card-actions>
			<v-card-title>
				<v-row dense>
					<v-select id="device_type" v-model="device.type" :items="deviceTypes" label="Device type" required
						hide-details>
					</v-select>
				</v-row>
			</v-card-title>
			<v-card-text v-if="device.type">
				<v-row dense>
					<v-col cols="12" class="d-flex align-center">
						<v-combobox id="location" v-model="device.location" label="Location" required :items="locations"
						</v-combobox>
					</v-col>
					<v-col cols="12">
						<v-text-field id="device-id" type="number" v-model.number="device.id" :disabled="disabled"
							label="Device Nummer" required :rules="[deviceNumberRule]">
						</v-text-field>
					</v-col>
				</v-row>
				<v-row class="mb-4" dense>
					<v-col cols="12">
						<v-text-field id="mac" v-model="device.module.mac" :disabled="disabled" label="MAC" required
							hide-details></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field id="relayduration" type="number" v-model.number="device.module.relayDuration.self"
							:disabled="disabled" label="Relay Duration Self" required hide-details></v-text-field>
					</v-col>
				</v-row>
				<v-card v-if="device.type == 'washer'"> <!-- only show if device is a washer -->
					<v-card-title>Detergent</v-card-title>

					<v-row dense>
						<v-col cols="12">
							<v-text-field id="detergentname" v-model="device.detergent.id" :disabled="disabled"
								label="Modul name" required hide-details
								@input="device.detergent.id = $event.target.value.toUpperCase()">
							</v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field id="detergentnr" type="number" v-model.number="device.detergent.nr"
								:disabled="disabled" label="Detergent Relay Number" required
								hide-details></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field id="detergentrelayduration" type="number"
								v-model.number="device.module.relayDuration.detergent" :disabled="disabled"
								label="Detergent Relay Duration" required hide-details></v-text-field>
						</v-col>
					</v-row>
					<v-card-title>Softener</v-card-title>
					<v-row dense>
						<v-col cols="12">
							<v-text-field id="softenername" v-model="device.softener.id" :disabled="disabled"
								label="Modul name" required hide-details
								@input="device.softener.id = $event.target.value.toUpperCase()">
							</v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field id="softenernr" type="number" v-model.number="device.softener.nr"
								:disabled="disabled" label="Softener Relay Number" required hide-details></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field id="softenerrelayduration" type="number"
								v-model.number="device.module.relayDuration.softener" :disabled="disabled"
								label="Softener Relay Duration" required hide-details></v-text-field>
						</v-col>
					</v-row>
				</v-card>
			</v-card-text>
		</v-card>
	</v-dialog>
	<v-snackbar v-model="snackbar.show" :color="snackbar.color">
		{{ snackbar.text }}
	</v-snackbar>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as bps from '../bpsclient';
import type { Device } from '../bpsclient'
const dialog = defineModel<boolean>('dialog', { required: true })
const snackbar = ref({ color: 'success', text: 'gespeichert', show: false })
const props = defineProps<{
	device: Device;
	locations: string[];
	deviceTypes: string[];
	editing: boolean;
	emit: (event: "delete-device", ...args: any[]) => void;
}>()

const disabled = ref(true)
const update_disabled = () => {
	disabled.value = props.device.location ? false : true
}
watch(() => props.device?.location, update_disabled)
const deviceNumberRule = (value) => {
	return value == 10 ? true : "not available"
}
const saveChanges = () => {
	var api = new bps.DefaultApi(new bps.ApiClient());
	api.newDevice(props.device, (error, data, response) => {
		if (error) {
			snackbar.value.text = response?.body?.message || 'An error occurred while saving the device'
			snackbar.value.color = 'error'
			snackbar.value.show = true
		} else {
			snackbar.value.text = `Device ${props.device.id} for location ${props.device.location} saved`
			snackbar.value.color = 'success'
			snackbar.value.show = true
		}
	});
}
</script>
