import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/components/App';
import * as serviceWorker from './serviceWorker';
import {GameScreenEnum} from "./js/model/enum/GameScreenEnum";
import {RootStore} from "./js/model/store/RootStore";
import NetworkBuilder from "./js/model/NetworkBuilder";
import ProjectWebSocket from "./js/model/websocket/ProjectWebSocket";
import StatisticsWebSocket from "./js/model/websocket/StatisticsWebSocket";

declare const window: any;
let store = RootStore.create({
    token: null,
    screen: "login",
    companyScreen: GameScreenEnum.GAME,
    baseUrl: "http://34.102.219.107",
    statisticUrl: "http://35.228.247.67",
    userHash: "",
    company: {
        id: 0,
        name: "Name Loading",
        money: 0,
        previousMoney: 0,
        currentProject: null,
        designOffice: [
        ],
        programmingOffice: [
        ],
        marketingOffice: [
        ],
        hiringOffice: ""
    },
    statistics: {
        companiesStats: [
        ],
        projectsStats: [
        ]
    }
});

window.store = store;
const builder = NetworkBuilder.getInstance();
const webSocket = ProjectWebSocket.getInstance();
const statistics = StatisticsWebSocket.getInstance();

ReactDOM.render(
    <React.StrictMode>
        <App store={store}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
