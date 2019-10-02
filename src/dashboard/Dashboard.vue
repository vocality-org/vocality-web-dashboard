<template>
    <v-app>
        <AppBar />

        <QueueDrawerHandle />
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

import AppBar from './components/AppBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import GuildDrawer from './components/GuildDrawer.vue';
import QueueDrawer from './components/QueueDrawer.vue';
import QueueDrawerHandle from './components/QueueDrawerHandle.vue';
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
    mounted() {
        this.$socket.client.io.opts.query = { discordKey: AuthState.token, userId: DiscordState.userId };
        this.$socket.client.open();
        DiscordState.fetchUserGuilds();
        this.$socket.client.emit('userGuilds', DiscordState.userGuilds.map(g => g.id));
    },
    components: {
        AppBar,
        AppDrawer,
        GuildDrawer,
        QueueDrawer,
        QueueDrawerHandle,
        MusicBar,
    },
})
export default class Dashboard extends Vue {}
</script>
