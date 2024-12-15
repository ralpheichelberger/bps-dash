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
.v-dialog.bubble_style {
    /* max-width: 600px;     */
    background: var(--background-gradient);

    /* justify-self: center;
    align-self: center; */
}
span.action{
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

</style>