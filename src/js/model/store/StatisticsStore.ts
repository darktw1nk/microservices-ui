import {types, Instance} from "mobx-state-tree";


export const ProjectStats = types.model("ProjectStats", {
    name: types.string,
    revenue: types.number,
    companyName: types.string
});

export const CompanyStats = types.model("CompaniesStatis", {
    name: types.string,
    money: types.number,
    workers: types.number
});

export const Statistics = types.model("Statistics", {
    companiesStats: types.array(CompanyStats),
    projectsStats: types.array(ProjectStats)
}).actions(self => ({
    clearStatistic() {
        self.companiesStats.clear();
        self.projectsStats.clear();
    },

    clearCompaniesStats() {
        self.companiesStats.clear();
    },

    clearProjectStats() {
        self.projectsStats.clear();
    },

    addCompanyStat(stat: CompanyStats) {
        self.companiesStats.push(stat);
    },

    addProjectStat(stat: ProjectStats) {
        self.projectsStats.push(stat);
    }
}));


export type ProjectStats = Instance<typeof ProjectStats>;
export type CompanyStats = Instance<typeof CompanyStats>;