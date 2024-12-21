import { createApp, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { registerPlugins } from '@/plugins'


import App from './App.vue';
import Customer from './components/Customer.vue';
import PayDevice from './components/PayDevice.vue';
import Admin from './components/Admin.vue';
import Home from './Home.vue';
import Home2 from './Home2.vue';


const routes = [
    { path: '/B/:id', name: 'Customer', component: Customer, props: true },
    { path: '/cp', name: 'PayDevice', component: PayDevice },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/', name: 'Home', component: Home },
    { path: '/manual/all.png', name: 'Home2', component: Home2 },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
registerPlugins(app)

app.use(router);

app.mount('#app');

