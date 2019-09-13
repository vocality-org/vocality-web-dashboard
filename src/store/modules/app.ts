import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

class GuildBarState {
    isOpen: boolean;
    activeGuildId: string;

    constructor() {
        this.isOpen = false;
        this.activeGuildId = '';
    }

    @Mutation
    open() {
        this.isOpen = true;
    }
    @Mutation
    close() {
        this.isOpen = false;
    }
    @Mutation
    setActiveGuildId(id: string) {
        this.activeGuildId = id;
    }
}

class QueueBarState {
    isOpen: boolean;

    constructor() {
        this.isOpen = false;
    }

    @Mutation
    open() {
        this.isOpen = true;
    }

    @Mutation
    close() {
        this.isOpen = false;
    }
}

export interface IAppState {
    guildBar: GuildBarState;
    queueBar: QueueBarState;
}

@Module({
    name: 'app',
    namespaced: true,
})
export class App extends VuexModule implements IAppState {
    guildBar = new GuildBarState();
    queueBar = new QueueBarState();
}
