<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthState } from '@/store';
import { DiscordState } from '@/store';

@Component({
    async beforeRouteEnter(to, from, next) {
        const code = to.query['code'];

        if (code && !AuthState.hasPermission) {
            await AuthState.discordAuth(to.query['code'].toString());
        }

        if (AuthState.hasPermission) {
            if (!DiscordState.hasAccountData) {
                await DiscordState.fetchAccount();
            }
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
