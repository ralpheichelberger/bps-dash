<template>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <title>Bubblpoint Waschsalons</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>

    </body>

    </html>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>
export default {
    name: 'App',
};
</script>
<style>
body {
    height: unset !important;
    display: unset !important;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

:root {
    --background-gradient: linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC, #FFD6A5, #C1F7D5, #A2E3F7, #A1C4FD);
    /* Pastel gradient */
    --v-theme-on-surface-variant: #FF6A88;
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

.bubble_style {
    font-family: "DreamingOutloud", Arial, sans-serif;
    color: black;
    height: 100vh;
    /* max-width: 600px; */
    background: linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC, #FFD6A5, #C1F7D5, #A2E3F7, #A1C4FD);
    justify-content: center;
    align-self: center;
    font-size: large;
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
}

.admin {
    background: rgb(78, 208, 255) !important;
}

/* Gradient Animation */
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
</style>