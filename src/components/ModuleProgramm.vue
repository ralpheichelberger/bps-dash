<template>
    <div>
        <v-container>
            <v-form @submit.prevent="handleSubmit">
                <v-text-field label="Type" v-model="formData.typ" required></v-text-field>
                <!-- <v-text-field label="Version" v-model="formData.version" required></v-text-field> -->
                <v-file-input label="Binary File" v-model="formData.file" required></v-file-input>
                <v-btn type="submit" color="primary">Upload</v-btn>
            </v-form>
        </v-container>
        <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
            {{ snackbarMessage }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAPI } from '@/composables/useAPI';

const { uploadModuleProgramm } = useAPI();

const formData = ref({
    typ: 'washer',
    version: 'default',
    file: null,
});

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');

const handleSubmit = async () => {

uploadModuleProgramm(formData.value).then((response) => {
        snackbarMessage.value = response.message || 'Upload successful!';
        snackbarColor.value = 'success';

}).catch((error) => {
    snackbarMessage.value = 'An error occurred during upload.';
    snackbarColor.value = 'error';
}).finally(() => {
    snackbar.value = true;
});


};
</script>