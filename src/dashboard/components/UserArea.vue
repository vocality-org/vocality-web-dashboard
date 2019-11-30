<template>
    <div>
        <v-menu offset-y left :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn fab icon v-on="on" elevation="0" ripple>
                    <v-avatar size="26">
                        <img :src="discordAvatar" alt="avatar" />
                    </v-avatar>
                </v-btn>
            </template>
            <v-list dense>
                <v-list-item class="mt-2">
                    <v-avatar size="26" class="mr-3">
                        <img :src="discordAvatar" alt="avatar" />
                    </v-avatar>
                    <div class="username-discriminator">
                        <h4>{{ username }}</h4>
                        <span>#{{ discriminator }}</span>
                    </div>
                </v-list-item>

                <v-divider class="my-3"> </v-divider>

                <v-list-item @click="settings()">
                    <v-list-item-icon>
                        <v-icon>{{ mdiSettings }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            $t('settings')
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                    @click="showThemeSelector = !showThemeSelector"
                    :class="showThemeSelector ? 'py-1' : ''"
                >
                    <v-list-item-icon>
                        <v-icon>{{ mdiDarkmode }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            :style="
                                showThemeSelector ? 'min-width: 156.47px' : ''
                            "
                        >
                            Darkmode:
                            <span v-if="isDarkmodeActive">{{ $t('on') }}</span>
                            <span v-else>{{ $t('off') }}</span>

                            <div
                                v-if="showThemeSelector"
                                class="switch-container"
                            >
                                <v-switch
                                    color="primary"
                                    v-model="darkmodeSwitch"
                                    class="switch-fix"
                                >
                                </v-switch>
                            </div>
                            <v-icon v-else style="margin-left: 48px">
                                {{ mdiArrowRight }}
                            </v-icon>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="my-3"> </v-divider>

                <v-list-item @click="logout()">
                    <v-list-item-icon>
                        <v-icon>{{ mdiLogout }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ $t('logout') }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    AuthState,
    DiscordState,
    AppState,
    PersistentUserDataState,
} from '@/store';
import { mapState, mapGetters } from 'vuex';
import {
    mdiMenuDown,
    mdiSettings,
    mdiLogoutVariant,
    mdiBrightness4,
    mdiChevronRight,
} from '@mdi/js';

@Component({
    computed: {
        discordAvatar() {
            return DiscordState.avatar;
        },
        darkmodeSwitch: {
            get() {
                return PersistentUserDataState.isDarkmodeActive;
            },

            set(state: boolean) {
                this.$vuetify.theme.dark = state;
                PersistentUserDataState.changeDarkmodeActive(state);
            },
        },
        ...mapGetters('discord', ['username', 'discriminator']),
        ...mapState('persistentUserData', ['isDarkmodeActive']),
    },
})
export default class UserArea extends Vue {
    mdiMenuDown = mdiMenuDown;
    mdiLogout = mdiLogoutVariant;
    mdiSettings = mdiSettings;
    mdiDarkmode = mdiBrightness4;
    mdiArrowRight = mdiChevronRight;
    showThemeSelector = false;

    settings() {
        this.$router.push({ name: 'settings' });
    }

    logout() {
        AuthState.logout();
        DiscordState.logout();
        this.$socket.client.close();
        this.$router.push('/login');
    }
}
</script>

<style lang="scss" scoped>
.username-discriminator {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
}

.switch-fix {
    position: absolute;
    top: -8px;
    right: 8px;
}
.slide-out-right {
    position: relative;
    transform: translateX(100%);
    z-index: -1;
}
.below {
    position: absolute;
}
.above {
    position: absolute;
    z-index: 2;
}
</style>

<i18n>
{
  "en": {
    "settings": "Settings",
    "empty": "There is nothing in Queue",
    "search": "Search a Song",
    "autoplay": "Autoplaying similar songs",
    "on": "on",
    "off": "off",
    "logout": "Logout"
  },
  "de": {
    "settings": "Einstellungen",
    "clip_hint": "Warteschlange ist leer",
    "search": "Nach Song suchen",
    "autoplay": "Spielt ähnliche songs",   
    "on": "An",
    "off": "Aus",
    "logout": "Abmelden"
  }
}
</i18n>
