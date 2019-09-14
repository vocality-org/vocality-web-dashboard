<template>
    <div>
        <v-app-bar
            app
            dense
            :color="$vuetify.breakpoint.mdAndDown ? 'primary' : 'transparent'"
            :collapse="$vuetify.breakpoint.mdAndDown"
            :class="{ 'stick-to-drawer': appDrawerOpen && $vuetify.breakpoint.mdAndDown }"
            class="elevation-0"
        >
            <v-app-bar-nav-icon @click="openAppDrawer()" :hidden="$vuetify.breakpoint.lgAndUp">
                <v-icon>{{ navigationIcon }}</v-icon>
            </v-app-bar-nav-icon>
            <div class="flex-grow-1"></div>
            <UserArea />
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserArea from './UserArea.vue';

import { mdiMenu } from '@mdi/js';
import { AppState } from '../../store';
import { mapState } from 'vuex';

@Component({
    components: {
        UserArea,
    },
    computed: {
        appDrawerOpen() {
            return AppState.appDrawer.isOpen;
        },
    },
})
export default class AppBar extends Vue {
    navigationIcon = mdiMenu;

    openAppDrawer() {
        AppState.appDrawer.open();
    }
}
</script>

<style lang="scss" scoped>
v-app-bar {
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.stick-to-drawer {
    transform: translateX(256px) !important;
}
</style>
