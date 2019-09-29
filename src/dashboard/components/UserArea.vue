<template>
    <div>
        <v-menu offset-y left>
            <template v-slot:activator="{ on }">
                <v-btn fab icon v-on="on" elevation="0" ripple>
                    <v-avatar size="26">
                        <img :src="discordAvatar" alt="avatar" />
                    </v-avatar>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="settings()">
                    <v-list-item-icon>
                        <v-icon class="mr-2">{{ mdiSettings }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout()">
                    <v-list-item-icon>
                        <v-icon class="mr-2">{{ mdiLogout }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthState, DiscordState } from '@/store';
import { mdiMenuDown, mdiSettings, mdiLogoutVariant } from '@mdi/js';

@Component({
    computed: {
        discordAvatar() {
            return DiscordState.avatar;
        },
        username() {
            return DiscordState.username;
        },
    },
})
export default class UserArea extends Vue {
    mdiMenuDown = mdiMenuDown;
    mdiLogout = mdiLogoutVariant;
    mdiSettings = mdiSettings;

    settings() {}

    logout() {
        AuthState.logout();
        DiscordState.logout();
        this.$socket.client.close();
        this.$router.push('/login');
    }
}
</script>
