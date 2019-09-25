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
                    component: () => import('@/dashboard/views/Search.vue'),
                },
            ],
        },
    ],
});
