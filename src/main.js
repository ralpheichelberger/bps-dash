import { createApp, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { registerPlugins } from '@/plugins'


import App from './App.vue';
import User from './components/User.vue';
import PayDevice from './components/PayDevice.vue';
import Marketing from './components/Marketing.vue';
import Admin from './components/Admin.vue';
import AdminTree from './components/AdminTree.vue';
import Home from './Home.vue';
import Home2 from './Home2.vue';


const routes = [
    { path: '/B/:id', name: 'User', component: User, props: true },
    { path: '/P/:deviceId', name: 'PayDevice', component: PayDevice , props: true},
    { path: '/M/:code', name: 'Marketing', component: Marketing , props: true},
    { path: '/admin', name: 'Admin', component: Admin }, // FIXME needs to be user in Users with type admin - PIN code?
    // { path: '/t', name: 'AdminTree', component: AdminTree }, // FIXME needs to be user in Users with type admin - PIN code?
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

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('@/assets/service-worker.js')
//         .then((registration) => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch((error) => {
//             console.error('Service Worker registration failed:', error);
//         });
// }