import {RootStoreType} from "../store/RootStore";
import {WebSocketEventTypes} from "./WebSocketEventTypes";

export default class ProjectWebSocket {
    private static instance: ProjectWebSocket;
    private socket: WebSocket | undefined;
    private store:RootStoreType;
    private clientId: string;
    private reconnectAttempt: number;

    private constructor(store:RootStoreType) {
        this.store=store;
        this.clientId = "";
        this.reconnectAttempt = 0;
    }

    public static getInstance(): ProjectWebSocket {
        if (!ProjectWebSocket.instance) {
            ProjectWebSocket.instance = new ProjectWebSocket(window.store);
        }

        return ProjectWebSocket.instance;
    }

    connect = (clientId:string) => {
        this.clientId = clientId;
        this.socket = new WebSocket("ws://"+this.store.getStrippedBaseUrl()+"/api/project/websocket/"+clientId);
        this.socket.addEventListener("open",this.onOpen);
        this.socket.addEventListener('close',this.onClose);
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener("error", this.onError);
    };

    onClose = (event:any) => {
        console.log("socket connection closed")
    };

    onOpen = (event:any) => {
        this.reconnectAttempt = 0;
        console.log('socket connection opened');
    };

    onError = (event:any) => {
        this.reconnectAttempt++;
        if (this.reconnectAttempt < 4) {
            console.log("reconnection");
            this.connect(this.clientId);
        }
    };

    onMessage = (event:any) => {
            console.log('Message from server ', event.data);
            let data = JSON.parse(event.data);
            switch (data.type) {
                case WebSocketEventTypes.BALANCE_UPDATE:
                    this.processBalanceUpdateEvent(data);
                    break;
                case WebSocketEventTypes.PROJECT_FINISHED:
                    this.processProjectFinishedEvent(data);
                    break;
                case WebSocketEventTypes.PROJECT_POINTS_UPDATE:
                    this.processPointUpdateEvent(data);
                    break;
                case WebSocketEventTypes.PROJECT_PROGRESS:
                    this.processProjectProgressEvent(data);
                    break;
            }
    };

    processBalanceUpdateEvent = (event:any) =>{
        this.store.company.addMoney(event.balanceUpdate);
    };

    processProjectFinishedEvent = (event:any) => {
        let self = this;
        setTimeout(function () {
            self.store.company.setCurrentProject(null);
        },3000);
    };

    processPointUpdateEvent = (event:any) => {
        if(this.store.company.currentProject){
            this.store.company.currentProject.setDesignPoints(event.designPoints);
            this.store.company.currentProject.setProgrammingPoints(event.programmingPoints);
            this.store.company.currentProject.setMarketingPoints(event.marketingPoints);
        }
    };

    processProjectProgressEvent = (event:any) => {
        if(this.store.company.currentProject){
            this.store.company.currentProject.setProgress(event.progress);
        }
    }
}