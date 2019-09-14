<template>
    <div class="guild-bar">
        <v-navigation-drawer v-model="isOpen" floating mini-variant mini-variant-width="64" absolute temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="@/assets/icons/discord.svg"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <div class="divider"></div>

            <v-list dense>
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
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { AppState } from '@/store';

@Component({
    computed: {
        isOpen: {
            get() {
                return AppState.guildBar.isOpen;
            },
            set(state) {
                state ? AppState.guildBar.open() : AppState.guildBar.close();
            },
        },
    },
})
export default class GuildDrawer extends Vue {
    guilds = [
        {
            id: '2135f43f13',
            imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            name: 'Guild1',
        },
        {
            id: '34t34g3',
            imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            name: 'Guild1',
        },
        {
            id: '23r21234ff',
            imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            name: 'Guild1',
        },
        {
            id: '34kn32423',
            imgUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
            name: 'Guild1',
        },
    ];

    setActiveGuildId(id: string) {
        AppState.guildBar.setActiveGuildId(id);
    }

    isActive(id: string) {
        return id === AppState.guildBar.activeGuildId;
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
</style>
