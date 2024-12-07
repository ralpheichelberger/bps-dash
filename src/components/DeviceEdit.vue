<template>
	<v-dialog id="washer-edit-dialog" v-model="dialog" max-width="400">
		<v-card v-if="device">
			<v-card-actions>
				<v-btn icon="mdi-close" @click="dialog = false"></v-btn>
				<v-spacer></v-spacer>
				<v-btn id="delete" text="Delete" variant="plain" @click="emit('delete-device')"></v-btn>
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
					<v-col cols="12">
						<v-select id="location" v-model="device.location" label="Location" required :items="locations"
							:menu="menuLocation">

						</v-select>
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
						<v-text-field id="relayduration" v-model.number="device.module.relayDuration.self"
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

const searchLocation = ref('');
const menuLocation = ref(false); // Controls the dropdown menu visibility
// Methods
const handleSearch = (value) => {
	searchLocation.value = value;
	menuLocation.value = !!value; // Show menu when there is a search term
};

const addNewLocation = () => {
	if (searchLocation.value && !props.locations.includes(searchLocation.value.trim())) {
		const newLocation = searchLocation.value.trim();
		props.locations.push(newLocation);
		props.device.location = newLocation; // Set the newly added location as selected
		menuLocation.value = false; // Close the menu
		searchLocation.value = ''; // Clear the search input
	}
};

const resetTypeSearch = () => {
	searchLocation.value = ''; // Reset the search value on blur
};
const searchType = ref('');
const menuType = ref(false); // Controls the dropdown menu visibility

// Methods
const handleTypeSearch = (value) => {
	searchType.value = value;
	menuType.value = !!value; // Show menu when there is a search term
};

const addNewType = () => {
	if (searchType.value && !props.deviceTypes.includes(searchType.value.trim())) {
		const newType = searchType.value.trim();
		props.locations.push(newType);
		props.device.type = newType; // Set the newly added location as selected
		menuType.value = false; // Close the menu
		searchType.value = ''; // Clear the search input
	}
};

const resetSearch = () => {
	searchType.value = ''; // Reset the search value on blur
};
</script>

<style></style>
