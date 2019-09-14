<template>
    <v-app>
        <v-app-bar app class="elevation-0" color="transparent">
            <div class="flex-grow-1"></div>
            <UserArea />
        </v-app-bar>

        <QueueDrawer />
        <AppDrawer />
        <GuildDrawer />

        <v-content>
            <router-view></router-view>
        </v-content>

        <MusicBar />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthState, DiscordState } from '@/store';

import AppDrawer from './components/AppDrawer.vue';
import UserArea from './components/UserArea.vue';
import GuildDrawer from './components/GuildDrawer.vue';
import QueueDrawer from './components/QueueDrawer.vue';
import MusicBar from './components/MusicBar.vue';

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
        AppDrawer,
        UserArea,
        GuildDrawer,
        QueueDrawer,
        MusicBar,
    },
})
export default class Dashboard extends Vue {}
</script>
