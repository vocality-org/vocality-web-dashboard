import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import axios from 'axios';

const baseUrl = 'https://discordapp.com/api';
const baseResourceUrl = 'https://cdn.discordapp.com';

export interface IDiscordState {
    account: Account | null;
}

@Module({
    name: 'discord',
    namespaced: true,
})
export class Discord extends VuexModule implements IDiscordState {
    account: Account | null = null;
    avatarUrl: string = '';

    get hasAccountData() {
        return this.account !== null;
    }

    get username() {
        return this.account ? this.account.username : undefined;
    }

    get avatar() {
        let type = '.png';
        if (this.account!.avatar.startsWith('_a')) {
            type = '.gif';
        }
        return `${baseResourceUrl}/avatars/${this.account!.id}/${this.account!.avatar}${type}`;
    }

    @MutationAction({ mutate: ['account'] })
    async fetchAccount() {
        return await axios
            .get<Account>(`${baseUrl}/users/@me`)
            .then(response => {
                return { account: response.data };
            })
            .catch(err => {
                console.log(err);
                return { account: null };
            });
    }

    @Mutation
    logout() {
        this.account = null;
    }
}

interface Account {
    username: string;
    locale: string;
    avatar: string;
    id: number;
    discriminator: number;
}
