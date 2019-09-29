<template>
    <div class="guild-bar">
        <v-navigation-drawer v-model="isOpen" floating mini-variant mini-variant-width="64" app temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="@/assets/icons/discord.svg"></v-img>
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
                    <v-list-item-avatar v-if="guild.iconUrl">
                        <v-img :src="guild.iconUrl"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else class="name-icon">
                        <span>{{ guild.nameIcon }}</span>
                    </v-list-item-avatar>
                    <v-list-item-content>{{ guild.name }}</v-list-item-content>
                </v-list-item>
            </v-list>

            <div v-if="!guilds.length && loading" class="loading-container mt-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <div v-if="!guilds.length && !loading" class="timeout-container mt-2">
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
                    <span>Add Vocality to your Discord Server</span>
                </v-tooltip>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapGetters } from 'vuex';
import { AppState } from '@/store';
import { mdiCommentPlusOutline } from '@mdi/js';

@Component({
    computed: {
        isOpen: {
            get() {
                return AppState.guildDrawer.isOpen;
            },
            set(state) {
                state ? AppState.guildDrawer.open() : AppState.guildDrawer.close();
            },
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
        AppState.guildDrawer.setActiveGuildId(id);
        this.$socket.client.emit('currentGuild', id);
    }

    isActive(id: string): boolean {
        return id === AppState.guildDrawer.activeGuildId;
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
</style>
