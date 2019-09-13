<template>
    <v-app>
        <v-app-bar>
            <div class="flex-grow-1"></div>
            <UserArea />
        </v-app-bar>

        <AppBar />
        <GuildBar />

        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthState, DiscordState } from '@/store';
import AppBar from './components/AppBar.vue';
import UserArea from './components/UserArea.vue';
import GuildBar from './components/GuildBar.vue';

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
    components: {
        AppBar,
        UserArea,
        GuildBar,
    },
})
export default class Dashboard extends Vue {}
</script>
