import {destroy} from "mobx-state-tree";
import {OfficeEnum} from "./enum/OfficeEnum";
import {RootStoreType, Worker} from "./store/RootStore";
import {GameScreenEnum} from "./enum/GameScreenEnum";
import NotificationBuilder from "./NotificationBuilder";

export default class NetworkBuilder {
    private static instance: NetworkBuilder;
    private store: RootStoreType;

    private constructor(store: RootStoreType) {
        this.store = store;
    }

    public static getInstance(): NetworkBuilder {
        if (!NetworkBuilder.instance) {
            NetworkBuilder.instance = new NetworkBuilder(window.store);
        }

        return NetworkBuilder.instance;
    }

    makeFireRequest(workerId: number, office: string) {
        let self = this;

        let request = {
            type: "fire",
            workerId: workerId,
            companyId: self.store.company.id,
            office: office
        };

        fetch(self.store.baseUrl + "/api/worker/action", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(response => {
            if (response.status === 200) {
                console.log("fire response");
                let result = self.store.company.removeWorker(workerId);
                if (!result) {
                    console.log("worker was not removed");
                    NotificationBuilder.errorNotification("Error", "Something went wrong");
                }
            } else {
                console.log("network error");
                NotificationBuilder.errorNotification("Error", "Something went wrong");
            }
        });
    }

}