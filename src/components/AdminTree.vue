<template>
    <v-treeview :items="items" />
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { VTreeview } from 'vuetify/labs/VTreeview';
import { useAPI } from '@/composables/useAPI';
import { useDevices } from '@/composables/useDevices';

const { devices, getDevices, deleteDevice, getLocationTypDevices } = useDevices()
const { getLocations } = useAPI();
const items = ref([]);
const locationTypDevices=ref();
getLocationTypDevices().then((data) => {
    locationTypDevices.value = data;
    let locations = toRaw(locationTypDevices.value.locations);
    
    locations.forEach((locationTyp) => {
        let sortedTypDevices = [...locationTyp.typ_devices];
        
        // Prioritize "washer", "dryer", and "pump"
        sortedTypDevices.sort((a, b) => {
            const priority = { washer: 1, dryer: 2, pump: 3 };
            return (priority[a.typ] || 100) - (priority[b.typ] || 100);
        });
        
        items.value.push({
            id: locationTyp.location.id,
            title: locationTyp.location.id,
            children: sortedTypDevices.map((typ) => {
                return {
                    id: typ.typ,
                    title: typ.typ,
                    children: typ.devices.sort((a, b) => parseInt(a.nr) - parseInt(b.nr)).map((device) => {
                        return {
                            id: device.id,
                            title: device.nr,
                        };
                    }),
                };
            }),
        });
    });
    
    console.log(items.value);
});


</script>
