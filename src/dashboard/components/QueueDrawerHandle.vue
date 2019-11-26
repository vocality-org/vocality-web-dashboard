<template>
    <div v-if="nextUpSong" class="footer-card" :style="stickToDrawer">
        <v-btn
            fab
            small
            color="transparent"
            class="elevation-0"
            :class="{ 'mr-1': !queueDrawerIsOpen }"
            @click="toggleQueueDrawer()"
        >
            <v-icon v-if="queueDrawerIsOpen">{{ closeIcon }}</v-icon>
            <v-icon v-else>{{ queueIcon }}</v-icon>
        </v-btn>
        <span v-if="!queueDrawerIsOpen">{{ queueDuration }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mdiPlaylistMusic, mdiChevronRight } from '@mdi/js';
import { AppState } from '../../store';
import { mapState, mapGetters } from 'vuex';

@Component({
    computed: {
        width() {
            return;
        },
        stickToDrawer() {
            if (AppState.queueDrawer.isOpen) {
                return {
                    'padding-right': '4px',
                    transform: `translateX(-${
                        this.$vuetify.breakpoint.mdAndUp ? 300 : 240
                    }px)`,
                };
            }
        },
        queueDrawerIsOpen() {
            return AppState.queueDrawer.isOpen;
        },
        ...mapGetters('music', ['queueDuration', 'nextUpSong']),
    },
})
export default class QeueDrawerHandle extends Vue {
    queueIcon = mdiPlaylistMusic;
    closeIcon = mdiChevronRight;

    toggleQueueDrawer() {
        AppState.queueDrawer.isOpen
            ? AppState.queueDrawer.close()
            : AppState.queueDrawer.open();
    }
}
</script>

<style lang="scss" scoped>
.footer-card {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 4px 16px 4px 4px;
    font-size: 14px;
    font-weight: 700;
    background-color: clr(brand, cyan);
    border-bottom-left-radius: 24px;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    @include mq(sm) {
        top: 54px + 32px;
        border-top-left-radius: 24px;
    }
}
</style>
