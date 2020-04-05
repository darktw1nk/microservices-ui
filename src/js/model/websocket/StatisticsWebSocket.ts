import {RootStoreType} from "../store/RootStore";
import {WebSocketEventTypes} from "./WebSocketEventTypes";
import {CompanyStats, ProjectStats} from "../store/StatisticsStore";

export default class ProjectWebSocket {
    private static instance: ProjectWebSocket;
    private socket: WebSocket | undefined;
    private store: RootStoreType;
    private clientId: string;
    private reconnectAttempt: number;

    private constructor(store: RootStoreType) {
        this.store = store;
        this.clientId = "";
        this.reconnectAttempt = 0;
    }

    public static getInstance(): ProjectWebSocket {
        if (!ProjectWebSocket.instance) {
            ProjectWebSocket.instance = new ProjectWebSocket(window.store);
        }

        return ProjectWebSocket.instance;
    }

    connect = (clientId: string) => {
        this.clientId = clientId;
        this.socket = new WebSocket("ws://" + this.store.getStrippedStatisticUrl() + "/api/statistic/websocket/" + clientId);
        this.socket.addEventListener("open", this.onOpen);
        this.socket.addEventListener('close', this.onClose);
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener("error", this.onError);
    };

    onClose = (event: any) => {
        console.log("socket connection closed")
    };

    onOpen = (event: any) => {
        this.reconnectAttempt = 0;
        console.log('socket connection opened');
    };

    onError = (event: any) => {
        this.reconnectAttempt++;
        if (this.reconnectAttempt < 4) {
            console.log("reconnection");
            this.connect(this.clientId);
        }
    };

    onMessage = (event: any) => {
        console.log('Message from server ', event.data);
        let data = JSON.parse(event.data);
        switch (data.type) {
            case WebSocketEventTypes.COMPANY_STATISTIC_EVENT:
                this.processCompanyStatistic(data);
                break;
            case WebSocketEventTypes.PROJECT_STATISTIC_EVENT:
                this.processProjectStatistic(data);
                break;
        }
    };

    processCompanyStatistic = (event: any) => {
        this.store.statistics.clearCompaniesStats();
        for(let i=0;i<event.companies.length;i++){
            let company = event.companies[i];
            let stat = CompanyStats.create({
                name:company.companyName,
                money:company.money,
                workers:company.workers,
            });
            this.store.statistics.addCompanyStat(stat);
        }
    };

    processProjectStatistic = (event: any) => {
        this.store.statistics.clearProjectStats();
        for(let i=0;i<event.projects.length;i++){
            let project = event.projects[i];
            let stat = ProjectStats.create({
                name:project.projectName,
                revenue:project.revenue,
                companyName:project.companyName,
            });
            this.store.statistics.addProjectStat(stat);
        }
    };

}