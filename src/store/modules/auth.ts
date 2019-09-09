import axios from 'axios';
import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators';
import { setupInterceptorTokenBearer } from '@/interceptors/tokenBearer';

const qs = require('querystring');

export interface IAuthState {
    tokenData: DiscordTokenData | null;
}

@Module({
    name: 'auth',
    namespaced: true,
})
export class Auth extends VuexModule implements IAuthState {
    tokenData: DiscordTokenData | null = null;

    get hasPermission(): boolean {
        return this.tokenData !== null;
    }

    get token() {
        return this.tokenData ? this.tokenData.access_token : undefined;
    }

    @MutationAction({ mutate: ['tokenData'] })
    async discordAuth(code: string) {
        const reqBody = {
            code: code,
            client_id: process.env.VUE_APP_DISCORD_CLIENT_ID,
            client_secret: process.env.VUE_APP_DISCORD_CLIENT_SECRET,
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
                setupInterceptorTokenBearer(response.data.access_token);
                return { tokenData: response.data };
            })
            .catch(err => {
                console.log(err);
                return { tokenData: null };
            });
    }

    @Mutation
    logout() {
        this.tokenData = null;
    }
}

interface DiscordTokenData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scrope: string;
}
