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
    { path: '/P/:devicename', name: 'PayDevice', component: PayDevice , props: true},
    { path: '/admin', name: 'Admin', component: Admin }, // FIXME needs to be user in customers with type admin - PIN code?
    { path: '/', name: 'Home', component: Home },
    { path: '/manual/all.png', name: 'Home2', component: Home2 },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
registerPlugins(app)

app.use(router);

app.mount('#app');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}