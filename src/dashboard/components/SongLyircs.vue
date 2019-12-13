<template>
    <div>{{ formattedContent }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class SongLyrics extends Vue {
    @Prop() readonly content: string | undefined;

    get formattedContent() {
        return this.content!.toUpperCase();
    }
}
</script>
