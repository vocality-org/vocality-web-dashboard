<template>
    <div>
        <div class="container">
            <h1 class="mb-5">Settings</h1>
            <v-divider></v-divider>
            <h2 class="mt-2">Theme</h2>
            <section class="section">
                <p>
                    Dark theme turns the light surfaces of the page dark,
                    creating an experience ideal for night. Try it out! Your
                    Dark theme setting will only apply to this browser.
                </p>
                <div class="current-theme"></div>
                <div class="theme-switch">
                    <img
                        :src="
                            require('@/assets/icons/dark-theme' +
                                (isDarkmodeActive ? '-selected' : '') +
                                '.svg')
                        "
                        height="64"
                        class="theme-button"
                        @click="setDarkTheme(true)"
                        alt="dark theme"
                    />

                    <img
                        :src="
                            require('@/assets/icons/light-theme' +
                                (isDarkmodeActive ? '' : '-selected') +
                                '.svg')
                        "
                        height="64"
                        class="theme-button"
                        @click="setDarkTheme(false)"
                        alt="light theme"
                    />
                </div>
                <h5 class="mb-5 mt-1">
                    Current theme: {{ isDarkmodeActive ? 'dark' : 'light' }}
                </h5>
            </section>

            <v-divider></v-divider>
            <h2 class="mt-2">History</h2>
            <section class="section">
                <v-slider
                    v-model="cacheSize"
                    color="primary"
                    :label="`Cache size: ${cacheSize}`"
                    min="10"
                    thumb-label="true"
                    step="5"
                    max="1000"
                ></v-slider>
            </section>

            <v-divider></v-divider>
            <h2 class="mt-2">Language</h2>
            <section class="section">
                coming soong
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { AppState, PersistentUserDataState } from '../../store';

@Component({
    computed: {
        cacheSize: {
            get() {
                return PersistentUserDataState.historyLength;
            },
            set(size: number) {
                PersistentUserDataState.setHistoryLength(size);
            },
        },
        ...mapState('app', ['isDarkmodeActive']),
    },
})
export default class Settings extends Vue {
    setDarkTheme(state: boolean) {
        if (state !== this.$vuetify.theme.dark) {
            this.$vuetify.theme.dark = state;
            AppState.changeDarkmodeActive(state);
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px, 64px;
    .line {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
}

.section {
    margin-left: 16px;
}

.theme-switch {
    display: flex;
}

.theme-button {
    cursor: pointer;
    position: relative;
    &:hover {
        transform: scale(1.1);
    }
    transition: transform 200ms ease;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
