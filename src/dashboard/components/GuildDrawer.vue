<template>
    <div class="guild-bar">
        <v-navigation-drawer v-model="isOpen" floating mini-variant mini-variant-width="64" app temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="@/assets/icons/discord.svg"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <div class="divider"></div>

            <v-list dense v-if="guilds">
                <v-list-item
                    v-for="guild in guilds"
                    :key="guild.id"
                    :class="isActive(guild.id) ? 'active' : 'inactive'"
                    @click="setActiveGuildId(guild.id)"
                    link
                >
                    <v-list-item-avatar>
                        <v-img :src="guild.imgUrl"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>{{ guild.name }}</v-list-item-content>
                </v-list-item>
            </v-list>

            <div else class="loading-container">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapGetters } from 'vuex';
import { AppState } from '@/store';

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
        this.$socket.client.emit('currentGuild', { guildId: '326751462136741899' });
    },
})
export default class GuildDrawer extends Vue {
    setActiveGuildId(id: string) {
        AppState.guildDrawer.close();
        AppState.guildDrawer.setActiveGuildId(id);
        this.$socket.client.emit('currentGuild', { guildId: id });
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
    background-color: #b2b2b2;
    border-radius: 2.5px;
    margin: 8px auto;
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

.loading-container {
    display: flex;
    justify-content: center;
}
</style>
