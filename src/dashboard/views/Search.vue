<template>
    <div>
        <div class="container">
            <div class="search">
                s
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mdiMagnify } from '@mdi/js';

@Component({})
export default class Search extends Vue {
    searchIcon = mdiMagnify;
    dropdownFont = ['Arial', 'Calibri', 'Courier', 'Verdana'];
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px, 64px;
    @include mq(sm) {
        padding: 32px 128px;
    }
}
</style>
