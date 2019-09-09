import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import axios from 'axios';
import interceptorsSetup from '@/interceptors/tokenBearer';
const qs = require('querystring');

@Module({
    namespaced: true,
})
export class AuthState extends VuexModule {
    tokenData: DiscordTokenData | null = null;

    get hasPermission() {
        return this.tokenData !== null ? true : false;
    }

    get token() {
        return this.tokenData ? this.tokenData.access_token : undefined;
    }

    @MutationAction({ mutate: ['tokenData'] })
    async discordAuth(code: string) {
        const reqBody = {
            code: code,
            client_id: '619738847294521344',
            client_secret: 'ghuep7m740BQxdQ0Vb_myIOz780I2HZn',
            scope: 'identify guilds',
            grant_type: 'authorization_code',
            redirect_uri: `${window.location.origin}/dashboard`,
        };

        return await axios
            .post<DiscordTokenData>('https://discordapp.com/api/oauth2/token', qs.stringify(reqBody), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(response => {
                interceptorsSetup(response.data.access_token);
                return { tokenData: response.data };
            })
            .catch(err => {
                console.log(err);

                return { tokenData: null };
            });
    }
}

interface DiscordTokenData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scrope: string;
}
