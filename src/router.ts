import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            alias: '/login',
            name: 'login',
            meta: { title: 'Login - Vocality Dashboard' },
            component: Login,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: { title: 'Vocality Dashboard' },
            component: () => import('@/dashboard/Dashboard.vue'),
            children: [
                {
                    path: 'search',
                    name: 'search',
                    meta: { title: 'Search - Vocality Dashboard' },
                    component: () => import('@/dashboard/views/Search.vue'),
                },
                {
                    path: 'playlists',
                    name: 'playlists',
                    meta: { title: 'Playlists - Vocality Dashboard' },
                    component: () => import('@/dashboard/views/Playlists.vue'),
                },
                {
                    path: 'playlists/:id_name',
                    name: 'editPlaylist',
                    component: () =>
                        import('@/dashboard/views/EditPlaylist.vue'),
                },
                {
                    path: 'history',
                    name: 'history',
                    meta: { title: 'History - Vocality Dashboard' },
                    component: () => import('@/dashboard/views/History.vue'),
                },
                {
                    path: 'settings',
                    name: 'settings',
                    meta: { title: 'Settings - Vocality Dashboard' },
                    component: () => import('@/dashboard/views/Settings.vue'),
                },
            ],
        },
    ],
});
