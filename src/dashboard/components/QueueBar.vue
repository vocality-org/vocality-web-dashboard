<template>
    <div>
        <v-navigation-drawer v-model="isOpen" right app floating clipped> </v-navigation-drawer>
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
                return AppState.queueBar.isOpen;
            },
            set(state) {
                state ? AppState.queueBar.open() : AppState.queueBar.close();
            },
        },
    },
})
export default class QueueBar extends Vue {}
</script>

<style lang="scss" scoped></style>
