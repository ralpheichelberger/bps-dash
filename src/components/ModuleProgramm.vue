<template>
    <div>
        <v-container>
            <v-form @submit.prevent="handleSubmit">
                <v-text-field label="Type" v-model="formData.typ" required></v-text-field>
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
    version: String(Math.floor(Date.now() / 1000)),
    file: null,
    checksum: 'test',
});

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');

import CryptoJS from 'crypto-js';

const calculateChecksum = async (file) => {
    const fileBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(fileBuffer);
    const hash = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
    return hash;
};

const handleSubmit = async () => {
    if (formData.value.file) {
        try {
            formData.value.checksum = await calculateChecksum(formData.value.file);
        } catch (error) {
            snackbarMessage.value = 'Error calculating checksum.';
            snackbarColor.value = 'error';
            snackbar.value = true;
            return;
        }
    }

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
