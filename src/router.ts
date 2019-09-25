import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import About from '@/views/About.vue';
import Dashboard from '@/dashboard/Dashboard.vue';

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
            component: Dashboard,
            children: [
                {
                    path: 'search',
                    name: 'search',
                    component: () => {
                        return import('@/dashboard/views/Search.vue');
                    },
                },
                {
                    path: 'about',
                    name: 'about1',
                    component: About,
                },
            ],
        },
    ],
});
