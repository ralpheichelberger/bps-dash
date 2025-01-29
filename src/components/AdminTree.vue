<template>
    <v-treeview :items="items" />
</template>

<script setup>
import { ref } from 'vue';
import { VTreeview } from 'vuetify/labs/VTreeview';
import { useAPI } from '@/composables/useAPI';
import { useDevices } from '@/composables/useDevices';

const { devices, getDevices, deleteDevice, getLocationTypDevices } = useDevices()
const { getLocations } = useAPI();
const items = ref([]);
getLocationTypDevices().then((data) => {
    items.value = data;
});

</script>
