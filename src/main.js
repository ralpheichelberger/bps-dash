import { createApp, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { registerPlugins } from '@/plugins'


import App from './App.vue';
import Customer from './components/Customer.vue';
import PayDevice from './components/PayDevice.vue';
import Admin from './components/Admin.vue';

const routes = [
    { path: '/cc', name: 'Customer', component: Customer },
    { path: '/cp', name: 'PayDevice', component: PayDevice },
    { path: '/admin', name: 'Admin', component: Admin },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
registerPlugins(app)

app.use(router);

app.mount('#app');

