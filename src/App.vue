<template>
    <html lang="en">

    <head>
        <title>Bubblpoint Waschsalons</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <v-app>
            <div v-if="isStaging" class="watermark">STAGING</div>
            <div v-if="isLocal" class="watermark">LOCAL</div>
            <router-view />
        </v-app>
    </body>

    </html>

</template>

<script setup>
const isStaging = import.meta.env.VITE_APP_ENV === 'staging';
const isLocal = import.meta.env.VITE_APP_ENV === 'local';
</script>

<style>
@import '@/assets/bubble.css';
body {
    height: unset !important;
    display: unset !important;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

:root {
    /* Pastel gradient */
    --background-gradient: linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC, #FFD6A5, #C1F7D5, #A2E3F7, #A1C4FD);
    --user-padding-left: 1rem;
    --user-padding-right: 1rem;
    --card-background: rgba(32, 32, 32, 0.74);
}

.v-table {
    background: var(--card-background) !important;
    border-radius: .3rem !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th{
    background: var(--card-background) !important;
}
@font-face {
    font-family: "DreamingOutloud";
    src: url("@/assets/bubblekassa.otf") format("opentype");
}

.v-carousel__controls {
    color: rgb(0, 255, 42) !important;
}

span.action {
    color: #2fff44;
    font-weight: bold;
    font-size: 1.5rem;
}

.v-card.bubble_style {
    font-family: "DreamingOutloud", Arial, sans-serif;
    color: black;
    height: 100vh;
    /* max-width: 600px; */
    background: var(--background-gradient);
    justify-content: center;
    align-self: center;
    font-size: large;
}

.admin {
    background: rgb(136, 219, 245) !important;
    color: rgb(155, 0, 0) !important;
}
.watermark {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8rem;
  font-weight: bold;
  color: rgba(1, 0, 88, 0.2);
  transform: translate(-50%, -50%) rotate(-60deg);
  pointer-events: none;
  z-index: 9999;
}
/* Gradient Animation
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes myFadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
} */
</style>