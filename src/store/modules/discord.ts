import { BotState } from './../index';
import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import axios from 'axios';

const baseUrl = 'https://discordapp.com/api';
const baseResourceUrl = 'https://cdn.discordapp.com';

export interface IDiscordState {
    account: Account | undefined;
    userGuilds: Guild[];
    guilds: Guild[];
}

@Module({
    name: 'discord',
    namespaced: true,
})
export class Discord extends VuexModule implements IDiscordState {
    account: Account | undefined = undefined;
    userGuilds: Guild[] = [];
    guilds: Guild[] = [];

    get hasAccountData() {
        return this.account !== undefined;
    }

    get username() {
        return this.account ? this.account.username : undefined;
    }

    get userId() {
        return this.account ? this.account.id : undefined;
    }

    get avatar() {
        let type = 'png';
        // get default avatar
        if (!this.account!.avatar) {
            return `${baseResourceUrl}/embed/avatars/${this.account!.discriminator % 5}.${type}`;
        }
        // get gif avatar
        if (this.account!.avatar.startsWith('_a')) {
            type = 'gif';
        }
        return `${baseResourceUrl}/avatars/${this.account!.id}/${this.account!.avatar}.${type}`;
    }

    @Mutation
    setBotGuildsWithId(botGuildIds: string[]) {
        this.guilds = this.userGuilds.filter(g => botGuildIds.includes(g.id));
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
                return { account: undefined };
            });
    }

    @MutationAction({ mutate: ['userGuilds'] })
    async fetchUserGuilds() {
        const userGuilds = await axios
            .get<Guild[]>(`${baseUrl}/users/@me/guilds`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log(err);
                return [];
            });

        // if icon is null, acronym of name is displayed
        userGuilds.forEach(guild => {
            if (guild.icon) {
                guild.iconUrl = `${baseResourceUrl}/icons/${guild.id}/${guild.icon}.png`;
            } else {
                guild.nameIcon = guild.name.match(/\b[\w(\S)]/g)!.join('');
            }
        });

        return { userGuilds: userGuilds };
    }

    @Mutation
    logout() {
        this.account = undefined;
    }
}

/**
 * Discord user data
 * https://discordapp.com/developers/docs/resources/user#user-object-example-user
 */
interface Account {
    id: string;
    username: string;
    locale: string;
    avatar: string;
    discriminator: number;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object
 */
interface Guild {
    id: string;
    name: string;
    icon: string;
    iconUrl?: string;
    nameIcon?: string;
}
