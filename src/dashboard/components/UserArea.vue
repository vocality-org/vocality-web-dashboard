<template>
    <div>
        <v-menu offset-y="">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="transparent" elevation="0" style="height: 52px">
                    <v-avatar size="38" class="mr-3">
                        <img :src="discordAvatar" alt="avatar" />
                    </v-avatar>
                    {{ username }}
                    <v-icon>{{ mdiMenuDown }}</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="logout()">
                    <v-list-item-title>
                        <v-icon class="mr-2">{{ mdiSettings }}</v-icon>
                        Settings
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout()">
                    <v-list-item-title>
                        <v-icon class="mr-2">{{ mdiLogout }}</v-icon>
                        Log Out
                    </v-list-item-title>
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

    logout() {
        AuthState.logout();
        DiscordState.logout();
        this.$router.push('/login');
    }
}
</script>
