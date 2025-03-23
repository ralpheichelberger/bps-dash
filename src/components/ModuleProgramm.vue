<template>
    <div>
        <v-container>
            <v-dialog v-model="uploadDialog" >
                <v-card>            
                    <v-card-title>Upload Module Programm 
                    </v-card-title>
                    <v-card-subtitle>upload will overwrite the binary with the same type <br /> and set it to status
                        'uploaded' and veryfied to 'false'</v-card-subtitle>
                    <v-card-text>
                        <v-form @submit.prevent="handleSubmit">
                            <v-text-field label="Type" v-model="formData.typ" required></v-text-field>
                            <v-file-input label="Binary File" v-model="formData.file" required></v-file-input>
                            <v-textarea label="Info" auto-grow v-model="formData.info"></v-textarea>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn @click="uploadDialog=false">close</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="deleteProgramm" color="">Delete</v-btn>
                        <v-btn @click="handleSubmit" color="">Upload</v-btn>
                        <v-btn @click="triggerUpdate" color="">Trigger Update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-card>
                <v-card-title>Module Programms
                    <v-btn style="float: right;" @click="newModuleProgramm">Neu</v-btn>
                </v-card-title>
                <v-card-subtitle>List of all uploaded module programms</v-card-subtitle>
                <v-table>
                    <thead>
                        <tr>
                            <th>Verified</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Version</th>
                            <!-- <th>Checksum</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in programms" :key="item.id" @click="editUpload(item)">
                            <td>
                                <v-icon v-if="item.verified" color="green">mdi-check-circle</v-icon>
                                <v-icon v-else color="red">mdi-close-circle</v-icon>
                            </td>
                            <td>{{ item.status }}</td>
                            <td>{{ item.typ }}</td>
                            <td>{{ item.version }}</td>
                            <!-- <td>{{ item.checksum }}</td> -->
                        </tr>
                    </tbody>

                </v-table>
            </v-card>
        </v-container>
        <v-dialog v-model="triggerUpdateDialog" max-width="600px">
            <v-card>
                <v-card-title>Trigger Update for Type '{{ formData.typ }}'</v-card-title>
                <v-card-text>
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="triggerUpdateDialog = false" color="">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="triggerUpdateDialog = false" color="blue">Test</v-btn>
                    <v-btn @click="triggerUpdateDialog = false" color="red">All Devices</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
            {{ snackbarMessage }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAPI } from '@/composables/useAPI';
const { programms, uploadModuleProgramm, getModuleProgramms, deleteModuleProgramm } = useAPI();
const reload = () => {
    getModuleProgramms();
};
reload();
const formData = ref({
    typ: '',
    version: String(Math.floor(Date.now() / 1000)),
    file: null,
    info: '',
    checksum: 'test',
});

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');
const triggerUpdateDialog = ref(false);
const uploadDialog = ref(false);
import CryptoJS from 'crypto-js';

const newModuleProgramm = () => {
    formData.value.typ = '';
    formData.value.version = String(Math.floor(Date.now() / 1000));
    formData.value.file = null;
    formData.value.info = '';
    uploadDialog.value = true;
};

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
        uploadDialog.value = false;
        reload();
    });
};
const editUpload = (item) => {
    formData.value.typ = item.typ;
    formData.value.version = item.version;
    formData.value.checksum = item.checksum;
    formData.value.info = item.info;
    formData.value.file = null; // Reset file input
    uploadDialog.value = true;
};

const triggerUpdate = () => {
    triggerUpdateDialog.value = true;
}
const deleteProgramm = () => {
    if (!confirm('Are you sure you want to delete this module programm?')) {
        return;
    }
    deleteModuleProgramm(formData.value.checksum).then((response) => {
        snackbarMessage.value = response.message || 'Delete successful!';
        snackbarColor.value = 'success';
        reload()
        uploadDialog.value = false;
    }).catch((error) => {
        snackbarMessage.value = 'An error occurred during delete.';
        snackbarColor.value = 'error';
    }).finally(() => {
        snackbar.value = true;
    });
};
</script>
