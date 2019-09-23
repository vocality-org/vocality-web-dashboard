import Vue from 'vue';
import Vuetify, { VTextField } from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
    components: {
        VTextField,
    },
    directives: {
        Ripple,
    },
});

export default new Vuetify({
    theme: {
        dark: true,
    },
    icons: {
        iconfont: 'mdiSvg',
    },
});
