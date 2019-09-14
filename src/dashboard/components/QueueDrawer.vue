<template>
    <div>
        <v-navigation-drawer v-model="isOpen" right app floating width="300" stateless> </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState } from '@/store';

@Component({
    computed: {
        isOpen: {
            get() {
                return AppState.queueDrawer.isOpen;
            },
            set(state) {
                state ? AppState.queueDrawer.open() : AppState.queueDrawer.close();
            },
        },
    },
})
export default class QueueDrawer extends Vue {}
</script>

<style lang="scss" scoped></style>
