<template>
    <v-layout class="rounded rounded-md">
 
        <v-app-bar :elevation="0">


  <v-app-bar-title>Bubblepoint Admin</v-app-bar-title>

  <template v-slot:append>
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
</v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <HelloWorld />
      </v-main>
    </v-layout>
</template>

<script setup>
import HelloWorld from './HelloWorld.vue';
</script>
