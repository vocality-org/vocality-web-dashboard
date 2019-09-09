import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/vuex';

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
            component: Login,
            meta: { title: 'Login - Vocality Dashboard' },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: function() {
                return import('@/dashboard/Dashboard.vue');
            },
            meta: { title: 'Vocality Dashboard' },
            async beforeEnter(to, from, next) {
                if (!to.query['code']) {
                    next({ path: '/login' });
                }
                try {
                    if (store.getters['auth/hasPermission']) {
                        next();
                    } else {
                        await store.dispatch('auth/discordAuth', to.query['code']);
                        if (store.getters['auth/hasPermission']) {
                            next();
                        } else {
                            next('/login');
                        }
                    }
                } catch (e) {
                    next({ path: '/login' });
                }
            },
        },
    ],
});
