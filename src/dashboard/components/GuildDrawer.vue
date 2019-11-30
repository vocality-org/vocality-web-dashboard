<template>
    <div class="guild-bar">
        <v-navigation-drawer
            v-model="isOpen"
            floating
            mini-variant
            mini-variant-width="64"
            app
            temporary
        >
            <v-list-item>
                <v-list-item-avatar>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                            :class="fillColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M23.6164 27.0139C23.6164 27.0139 22.6301 25.8358 21.8082 24.7948C25.3973 23.7811 26.7671 21.5345 26.7671 21.5345C25.6438 22.2742 24.5753 22.7948 23.6164 23.1509C22.2466 23.7263 20.9315 24.1098 19.6438 24.329C17.0137 24.8221 14.6027 24.6852 12.5479 24.3016C10.9863 24.0002 9.64384 23.5619 8.52055 23.1235C7.89041 22.8769 7.20548 22.5756 6.52055 22.192C6.47946 22.1646 6.43836 22.1441 6.39726 22.1235C6.35616 22.103 6.31507 22.0824 6.27397 22.055C6.21918 22.0276 6.19179 22.0002 6.16439 21.9728L6.16438 21.9728C5.67123 21.6989 5.39726 21.5071 5.39726 21.5071C5.39726 21.5071 6.71233 23.6989 10.1918 24.74C9.36987 25.7811 8.35616 27.0139 8.35616 27.0139C2.30137 26.8221 0 22.8495 0 22.8495C0 14.0276 3.9452 6.87694 3.9452 6.87694C7.89041 3.91804 11.6438 4.00023 11.6438 4.00023L11.9178 4.329C6.9863 5.75365 4.71233 7.91804 4.71233 7.91804C4.71233 7.91804 5.31507 7.58927 6.32877 7.12352C9.26027 5.83584 11.589 5.47968 12.5479 5.39749C12.5688 5.39401 12.5893 5.39053 12.6094 5.3871C12.7476 5.36357 12.8702 5.34269 13.0137 5.34269C14.6849 5.12352 16.5753 5.06872 18.5479 5.2879C21.1507 5.58927 23.9452 6.35639 26.7945 7.91804C26.7945 7.91804 24.6301 5.86324 19.9726 4.43858L20.3562 4.00023C20.3562 4.00023 24.1096 3.91804 28.0548 6.87694C28.0548 6.87694 32 14.0276 32 22.8495C32 22.8495 29.6712 26.8221 23.6164 27.0139ZM8.24657 16.7399C8.24657 15.0687 9.47945 13.6988 11.0411 13.6988C12.6027 13.6988 13.863 15.0687 13.8356 16.7399C13.8356 18.4112 12.6027 19.781 11.0411 19.781C9.50684 19.781 8.24657 18.4112 8.24657 16.7399ZM18.2466 16.7399C18.2466 15.0687 19.4794 13.6988 21.0411 13.6988C22.6027 13.6988 23.8356 15.0687 23.8356 16.7399C23.8356 18.4112 22.6027 19.781 21.0411 19.781C19.5068 19.781 18.2466 18.4112 18.2466 16.7399Z"
                        />
                    </svg>
                </v-list-item-avatar>
            </v-list-item>

            <div class="divider"></div>

            <v-list dense v-if="guilds.length">
                <v-list-item
                    v-for="guild in guilds"
                    :key="guild.id"
                    :class="isActive(guild.id) ? 'active' : 'inactive'"
                    @click="setActiveGuildId(guild.id)"
                    link
                >
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-list-item-avatar v-on="on" v-if="guild.iconUrl">
                                <v-img :src="guild.iconUrl"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-avatar
                                v-on="on"
                                v-else
                                class="name-icon"
                            >
                                <span
                                    style="width: 100%; text-align: center;"
                                    >{{ guild.nameIcon }}</span
                                >
                            </v-list-item-avatar>
                        </template>
                        <span>{{ guild.name }}</span>
                    </v-tooltip>

                    <v-list-item-content>{{ guild.name }}</v-list-item-content>
                </v-list-item>
            </v-list>

            <div
                v-if="!guilds.length && loading"
                class="loading-container mt-4"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>

            <div
                v-if="!guilds.length && !loading"
                class="timeout-container mt-2"
            >
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            fab
                            color="transparent"
                            class="elevation-0"
                            href="https://discordapp.com/api/oauth2/authorize?client_id=589595189631385602&permissions=3164224&scope=bot"
                            target="__blank"
                        >
                            <v-icon>{{ commentAdd }}</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ $t('dcadd') }}</span>
                </v-tooltip>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapGetters } from 'vuex';
import { AppState, DiscordState } from '@/store';
import { mdiCommentPlusOutline } from '@mdi/js';

@Component({
    computed: {
        isOpen: {
            get() {
                return AppState.guildDrawer.isOpen;
            },
            set(state) {
                state
                    ? AppState.guildDrawer.open()
                    : AppState.guildDrawer.close();
            },
        },
        fillColor() {
            return this.$vuetify.theme.dark
                ? 'discord-icon-dark'
                : 'discord-icon-light';
        },
        ...mapState('discord', ['guilds']),
    },
    mounted() {
        setTimeout(() => {
            this.$data.loading = false;
        }, 60000);
    },
})
export default class GuildDrawer extends Vue {
    commentAdd = mdiCommentPlusOutline;
    loading = true;

    setActiveGuildId(id: string) {
        AppState.guildDrawer.close();
        DiscordState.setCurrentGuildId(id);
        this.$socket.client.emit('currentGuild', id);
    }

    isActive(id: string): boolean {
        return id === DiscordState.currentGuildId;
    }

    created() {
        if (DiscordState.currentGuildId) {
            this.$socket.client.emit(
                'currentGuild',
                DiscordState.currentGuildId
            );
        }
    }
}
</script>

<style lang="scss" scoped>
.divider {
    width: 50%;
    height: 5px;
    background-color: #b2b2b25b;
    border-radius: 2.5px;
    margin: auto;
}

.inactive {
    &:hover,
    &:focus {
        opacity: 0.7;
        &::after {
            content: '';
            position: absolute;
            background-color: #b2b2b2;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            left: -4px;
        }
    }
}

.active {
    * {
        border-radius: 10px !important;
    }
    &::after {
        content: '';
        position: absolute;
        background-color: #fff;
        border-radius: 12px;
        width: 8px;
        height: 24px;
        left: -4px;
        transition: height 200ms ease;
    }
}

.name-icon {
    background-color: #686868;
}

.loading-container {
    display: flex;
    justify-content: center;
}

.timeout-container {
    display: flex;
    justify-content: center;
}
.discord-icon-dark {
    fill: #fff;
}
.discord-icon-light {
    fill: rgba(0, 0, 0, 0.54);
}
</style>

<i18n>
{
  "en": {
    "dcadd": "Add Vocality to your Discord Server"
  },
  "de": {
    "dcadd": "Füge Vocality zu deinem Discord Server hinzu"
  }
}
</i18n>
