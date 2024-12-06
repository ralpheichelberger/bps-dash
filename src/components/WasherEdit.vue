<template>
	<v-dialog v-model="dialog" max-width="600">
	  <v-card v-if="washer">
		<v-card-title>
		  <v-row dense>
			<v-col>
			  <v-text-field
				v-model="washer.id"
				:disabled="!editing"
				label="Washer ID"
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
				v-model="washer.location"
				:disabled="!editing"
				label="Location"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model="washer.module.mac"
				:disabled="!editing"
				label="MAC"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model.number="washer.module.relayDuration.self"
				:disabled="!editing"
				label="Relay Duration Self"
				required
				hide-details></v-text-field>
			</v-col>
		  </v-row>
  
		  <v-divider></v-divider>
  
		  <v-row dense>

			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model="washer.detergent.id"
				:disabled="!editing"
				label="Detergent Name"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model.number="washer.detergent.nr"
				:disabled="!editing"
				label="Detergent Relay Number"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model.number="washer.module.relayDuration.detergent"
				:disabled="!editing"
				label="Detergent Relay Duration"
				required
				hide-details></v-text-field>
			</v-col>
		  </v-row>
  
		  <v-divider></v-divider>
  
		  <v-row dense>

			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model="washer.softener.id"
				:disabled="!editing"
				label="Softener Name"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model.number="washer.softener.nr"
				:disabled="!editing"
				label="Softener Relay Number"
				required
				hide-details></v-text-field>
			</v-col>
			<v-col cols="12" md="4" sm="6">
			  <v-text-field
				v-model.number="washer.module.relayDuration.softener"
				:disabled="!editing"
				label="Softener Relay Duration"
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
import type { Washer } from '../bpsclient'

const dialog = defineModel<boolean>('dialog', { required: true })

const props = defineProps<{
	washer: Washer;
	editing: boolean;
	emit: (event: "delete-device", ...args: any[]) => void;
}>()

const saveChanges = () => {
	var api = new bps.DefaultApi(new bps.ApiClient());
	api.newWasher(props.washer, (error, data, response) => {
		if (error) {
			console.error(error);
		} else {
			console.log('API called successfully. Returned data: ' + data);
		}
	});
}
</script>

