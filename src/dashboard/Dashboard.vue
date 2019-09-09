<template>
    <div>
        DASHBOARD
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthState } from '@/store';

@Component({
    async beforeRouteEnter(to, from, next) {
        const code = to.query['code'];
        console.log(AuthState.hasPermission);

        if (code && !AuthState.hasPermission) {
            await AuthState.discordAuth(to.query['code'].toString());
            console.log(AuthState);
        }

        if (AuthState.hasPermission) {
            next();
            return;
        } else {
            next({
                path: '/login',
                query: {
                    redirectFrom: to.name,
                    code: code ? code : null,
                },
            });
        }
    },
})
export default class Dashboard extends Vue {}
</script>
