import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#29abe2',
                secondary: colors.grey.darken2,
            },
            light: {
                primary: '#ff3f60',
                secondary: colors.grey.lighten2,
            },
        },
        options: {
            customProperties: true,
        },
    },
    icons: {
        iconfont: 'mdiSvg',
    },
});
