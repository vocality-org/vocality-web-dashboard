import axios from 'axios';
import store from '@/store/vuex';

export default function setup(passedToken?: string) {
    axios.interceptors.request.use(
        function(config) {
            let token = passedToken;
            if (!passedToken) {
                token = store.state.auth.token;
            }
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        function(err) {
            return Promise.reject(err);
        },
    );
}
