<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class App extends Vue {}
</script>

<style lang="scss">
html {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    overflow: auto !important; // @vuetify FeelsWeirdMan
}
</style>
