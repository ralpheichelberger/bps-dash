<template>
	<v-dialog v-model="dialog" max-width="600">
	  <v-card v-if="pumprelay">
		<v-card-title>
		  <v-row dense>
			<v-col>
			  <v-text-field
				v-model="pumprelay.id"
				:disabled="!editing"
				label="Pumprelay ID"
				required
				hide-details></v-text-field>
			</v-col>
			<v-btn icon="mdi-close" @click="dialog = false"></v-btn>
		  </v-row>
		</v-card-title>
		<v-card-text>
		  <v-row dense>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model="pumprelay.location"
				:disabled="!editing"
				label="Location"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model="pumprelay.module.mac"
				:disabled="!editing"
				label="MAC"
				required
				hide-details></v-text-field>
			</v-col>
		  </v-row>
  

		</v-card-text>
  
		<v-divider></v-divider>
  
		<v-card-actions>
		  <v-spacer></v-spacer>
		  <v-btn text="Delete" variant="plain" @click="emit('delete-device')"></v-btn>
		  <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
		  <v-btn color="primary" text="Save" variant="tonal" @click="saveChanges"></v-btn>
		</v-card-actions>
	  </v-card>
	</v-dialog>
  </template>
  
  <script setup lang="ts">
import * as bps from '../bpsclient';
import type { PumpRelay } from '../bpsclient'

const dialog = defineModel<boolean>('dialog', { required: true })

const props = defineProps<{
	pumprelay: PumpRelay;
	editing: boolean;
	emit: (event: "delete-device", ...args: any[]) => void;
}>()

const saveChanges = () => {
	var api = new bps.DefaultApi(new bps.ApiClient());
	api.newWasher(props.pumprelay, (error, data, response) => {
		if (error) {
			console.error(error);
		} else {
			console.log('API called successfully. Returned data: ' + data);
		}
	});
}
</script>

