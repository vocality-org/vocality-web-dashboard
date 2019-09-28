import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

class AppDrawer {
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

class GuildDrawerState {
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

class QueueDrawerState {
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
    appDrawer: AppDrawer;
    guildDrawer: GuildDrawerState;
    queueDrawer: QueueDrawerState;
}

@Module({
    name: 'app',
    namespaced: true,
})
export class App extends VuexModule implements IAppState {
    appDrawer = new AppDrawer();
    guildDrawer = new GuildDrawerState();
    queueDrawer = new QueueDrawerState();
}
