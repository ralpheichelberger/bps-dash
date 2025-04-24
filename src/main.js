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
    { path: '/B/:id?', name: 'User', component: User, props: true },
    { path: '/b/:id?', name: 'User', component: User, props: true },
    { path: '/P/:deviceId', name: 'PayDevice', component: PayDevice , props: true},
    { path: '/p/:deviceId', name: 'PayDevice', component: PayDevice , props: true},
    { path: '/M/:code', name: 'Marketing', component: Marketing , props: true},
    { path: '/m/:code', name: 'Marketing', component: Marketing , props: true},
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/Admin', name: 'Admin', component: Admin },
    // { path: '/t', name: 'AdminTree', component: AdminTree }, // TODO new admin
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


window.APP_VERSION = '0.9.0_250424T1951';
