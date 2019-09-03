<template>
    <router-view></router-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import HelloWorld from './components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    overflow: auto !important;
}
</style>
