import {types, Instance, destroy} from "mobx-state-tree";
import ts from "typescript/lib/tsserverlibrary";
import {Statistics} from "./StatisticsStore";

export const Worker = types.model("Worker", {
    id: types.number,
    name: types.string,
    type: types.number,
    design: types.number,
    programming: types.number,
    marketing: types.number,
    salary: types.number
});

export const Project = types.model("Project", {
    id: types.number,
    name: types.string,
    type: types.string,
    genre: types.string,
    progress: types.number,
    designPoints: types.number,
    programmingPoints: types.number,
    marketingPoints: types.number,
    revenue: types.number
}).actions(self => ({
    setProgress(progress: number) {
        self.progress = progress;
    },

    setDesignPoints(points: number) {
        self.designPoints = points;
    },

    setProgrammingPoints(points: number) {
        self.programmingPoints = points;
    },

    setMarketingPoints(points: number) {
        self.marketingPoints = points;
    }
}));

export const CompanyState = types.model("CompanyState", {
    id: types.number,
    name: types.string,
    previousMoney: types.number,
    money: types.number,
    designOffice: types.array(Worker),
    programmingOffice: types.array(Worker),
    marketingOffice: types.array(Worker),
    candidates: types.array(Worker),
    currentProject: types.maybeNull(Project),
    hiringOffice: types.string
}).views(self => ({
    findCandidate(id: number) {
        return self.candidates.find(x => x.id === id);
    },

    findWorker(id: number) {
        for (let i = 0; i < self.designOffice.length; i++) {
            if (self.designOffice[i].id === id) return self.designOffice[i];
        }

        for (let i = 0; i < self.programmingOffice.length; i++) {
            if (self.programmingOffice[i].id === id) return self.programmingOffice[i];
        }

        // self.marketingOffice.find(worker => worker.id === id);
        for (let i = 0; i < self.marketingOffice.length; i++) {
            if (self.marketingOffice[i].id === id) return self.marketingOffice[i];
        }
        return undefined;
    }
})).actions(self => ({

    setId(id: number) {
        self.id = id;
    },

    setName(name: string) {
        self.name = name;
    },

    setMoney(money: number) {
        self.money = money;
    },
    addDesigner(designer: Worker) {
        self.designOffice.push(designer)
    },
    addProgrammer(programmer: Worker) {
        self.programmingOffice.push(programmer)
    },
    addMarketer(marketer: Worker) {
        self.marketingOffice.push(marketer);
    },

    clearCandidates() {
        self.candidates.clear();
    },

    clearOffices() {
        self.designOffice.clear();
        self.programmingOffice.clear();
        self.marketingOffice.clear();
    },

    addCandidate(candidate: Worker) {
        self.candidates.push(candidate);
    },

    setCurrentProject(project: Project | null) {
        self.currentProject = project;
    },

    setHiringOffice(office: string) {
        self.hiringOffice = office;
    },

    removeWorker(workerId: number) {
        let worker = self.findWorker(workerId);
        if (worker !== undefined) {
            destroy(worker);
            return true;
        } else {
            return false;
        }
    },

    addMoney(money: number) {
        self.previousMoney = self.money;
        self.money += money;
    },

    setPreviousMoney(money: number) {
        console.log("set previous money");
        self.previousMoney = money;
    }
}));

export const RootStore = types.model("RootStore", {
    token: types.maybeNull(types.string),
    screen: types.string,
    companyScreen: types.string,
    company: CompanyState,
    statistics: Statistics,
    baseUrl: types.string,
    statisticUrl: types.string,
    userHash: types.string
}).views(self => ({
    getStrippedBaseUrl() {
        if (self.baseUrl.startsWith("http://")) {
            return self.baseUrl.substring("http://".length);
        } else {
            return self.baseUrl;
        }
    },

    getStrippedStatisticUrl() {
        if (self.statisticUrl.startsWith("http://")) {
            return self.statisticUrl.substring("http://".length);
        } else {
            return self.statisticUrl;
        }
    }
})).actions(self => ({
    setToken(token: string) {
        self.token = token;
    },

    setScreen(screen: string) {
        self.screen = screen;
    },

    setCompanyScreen(screen: string) {
        self.companyScreen = screen;
    },

    setUserHash(hash: string) {
        self.userHash = hash;
    }
}));

export type RootStoreType = Instance<typeof RootStore>;
export type Worker = Instance<typeof Worker>;
export type Project = Instance<typeof Project>;