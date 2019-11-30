<template>
    <div>
        <div class="containerr">
            <h1 class="mb-5">{{ $t('h1') }}</h1>
            <v-divider></v-divider>
            <h2 class="mt-2">{{ $t('theme') }}</h2>
            <section class="section">
                <p>
                    {{ $t('theme_txt') }}
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
                    {{ $t('curr_theme') }}:
                    {{ isDarkmodeActive ? 'dark' : 'light' }}
                </h5>
            </section>

            <v-divider></v-divider>
            <h2 class="mt-2">{{ $t('history') }}</h2>
            <section class="section">
                <v-slider
                    v-model="cacheSize"
                    color="primary"
                    :label="`Cache: ${cacheSize}`"
                    min="10"
                    :thumb-label="true"
                    step="5"
                    max="1000"
                ></v-slider>
            </section>

            <v-divider></v-divider>
            <h2 class="mt-2">{{ $t('language') }}</h2>
            <section class="section">
                <v-select
                    class="mt-1"
                    :items="locales"
                    :value="userLocale"
                    @change="changeUserLocale($event)"
                ></v-select>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { PersistentUserDataState } from '@/store';

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
        ...mapState('persistentUserData', ['isDarkmodeActive', 'userLocale']),
    },
})
export default class Settings extends Vue {
    locales = [
        {
            value: 'en',
            text: 'English',
        },
        {
            value: 'de',
            text: 'Deutsch',
        },
    ];

    setDarkTheme(state: boolean) {
        if (state !== this.$vuetify.theme.dark) {
            this.$vuetify.theme.dark = state;
            PersistentUserDataState.changeDarkmodeActive(state);
        }
    }

    changeUserLocale(event: any) {
        this.$i18n.locale = event;
        PersistentUserDataState.changeUserLocale(event as string);
    }
}
</script>

<style lang="scss" scoped>
.containerr {
    max-width: 720px;
    padding: 32px 64px;
    margin: 0 auto;
    height: calc(100vh - 300px);

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

<i18n>
{
  "en": {
    "h1": "Settings",
    "theme": "Theme",
    "theme_txt": "Dark theme turns the light surfaces of the page dark, creating an experience ideal for night. Try it out! Your Dark theme setting will only apply to this browser.",
    "curr_theme": "Current theme",
    "history": "History",
    "language": "Language"
  },
  "de": {
    "h1": "Einstellungen",
    "theme": "Farbschema",
    "theme_txt": "Ein dunkles Farbschema ersetzt die hellen Oberflächen mit dunkleren und ist somit gut für dunkle Räume geeignet. Diese Einstellung wird nur in diesem Browser auf diesem Gerät gespeichert.",
    "curr_theme": "Ausgewähltes Farbschema",
    "history": "Verlauf",
    "language": "Sprache"
  }
}
</i18n>
