<template>
    <v-layout>
        <v-container>
            <v-btn  v-if="userexists" size="" class="floating-button"             
                @click="navigateToUser">
                <img src="@/assets/user.png" width="70px"/>
                </v-btn>
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

.floating-button {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10;
    font-size: 3rem;
    background: var(--background-gradient) !important;

}

.responsive-image {
    width: 100%;
    height: auto;
    display: block;
}
</style>