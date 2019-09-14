<template>
    <v-bottom-navigation app fixed>
        s
    </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mdiHistory } from '@mdi/js';

@Component({})
export default class MusicBar extends Vue {
    md = mdiHistory;
}
</script>
