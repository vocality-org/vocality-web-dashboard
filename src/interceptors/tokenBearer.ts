import axios from 'axios';
import { AuthState } from '@/store';

export default function setup(passedToken?: string) {
    axios.interceptors.request.use(
        function(config) {
            let token = passedToken;
            if (!passedToken) {
                token = AuthState.token;
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
