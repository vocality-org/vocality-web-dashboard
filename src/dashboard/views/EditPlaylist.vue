<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router/types/router';
import { PersistentUserDataState } from '@/store';

Component.registerHooks(['beforeRouteEnter']);

@Component({})
export default class EditPlaylist extends Vue {
    name: string = '';

    beforeRouteEnter(to: Route, from: Route, next: any) {
        const id = to.params.id_name.split('_')[0];
        const playlist = PersistentUserDataState.getPlaylistById(parseInt(id, 10));

        if (playlist) {
            this.name = to.params.id_name
                .split('_')
                .splice(0, 1)
                .join('_')
                .split('-')
                .join(' ');
            next();
        } else {
            next({
                path: from.path,
                query: {
                    redirectFrom: to.name,
                },
            });
        }
    }
}
</script>

<style lang="scss" scoped></style>
