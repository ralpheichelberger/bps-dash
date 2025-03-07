<template>
    <v-layout>
        <v-container class="position-relative">
            <v-fab  v-if="userexists" icon="mdi-account-circle" location="top right" size="" class="floating-button" absolute
                @click="navigateToUser"></v-fab>
            <img src="@/assets/Web.png" class="responsive-image">
        </v-container>
    </v-layout>
</template>
<script setup>
import { computed } from 'vue';
const userexists = computed(() => localStorage.getItem("user"))
const navigateToUser = () => {
  window.location.href = "/B"
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.position-relative {
    position: relative;
}

.floating-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    font-size: 3rem;
}

.responsive-image {
    width: 100%;
    height: auto;
    display: block;
}
</style>