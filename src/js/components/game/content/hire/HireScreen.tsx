import React, {useEffect} from 'react';
import {RootStoreType, Worker} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import "../../../../../css/HireScreen.css";
import {observer} from "mobx-react";
import {getSnapshot} from "mobx-state-tree";
import {Button} from "@material-ui/core";
import {GameScreenEnum} from "../../../../model/enum/GameScreenEnum";
import PotentialWorker from "./PotentialWorker";
import {number} from "mobx-state-tree/dist/types/primitives";
import NotificationBuilder from "../../../../model/NotificationBuilder";
import {OfficeEnum} from "../../../../model/enum/OfficeEnum";

interface Props {
    store: RootStoreType
}

function HireScreen(props: Props) {

    const [selected, setSelected] = React.useState(0);

    const onCandidateClick = (id: number) => {
        console.log("set selected "+id);
        setSelected(id);
    };

    const getWorkers = () => {
        props.store.company.clearCandidates();
        fetch(props.store.baseUrl + "/api/worker/candidates").then(response => {
            response.json().then(candidatesList => {
               candidatesList.map((candidate:any) => {
                   props.store.company.addCandidate(Worker.create({
                       id: candidate.id,
                       name: candidate.name,
                       type: candidate.type,
                       design: candidate.design,
                       programming: candidate.programming,
                       marketing: candidate.marketing,
                       salary: candidate.salary
                   }));
               });
            });
        });
    };
    useEffect(() => {getWorkers();},[]);

    const hire = () => {
        let request = {
            type: "hire",
            workerId: selected,
            companyId: props.store.company.id,
            office: props.store.company.hiringOffice
        };

        fetch(props.store.baseUrl + "/api/worker/action", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(response => {
           if(response.status === 200){
               let worker = props.store.company.findCandidate(selected);
               if(worker){
                   let workerJson = getSnapshot(worker);
                   let hiringOffice = props.store.company.hiringOffice;
                   if(hiringOffice === OfficeEnum.DESIGN){
                       props.store.company.addDesigner(Worker.create(workerJson));
                   } else if(hiringOffice === OfficeEnum.DEVELOPMENT){
                       props.store.company.addProgrammer(Worker.create(workerJson));
                   } else {
                       props.store.company.addMarketer(Worker.create(workerJson));
                   }
                   props.store.setCompanyScreen(GameScreenEnum.GAME);
               } else {
                   NotificationBuilder.errorNotification("Error","Something went wrong");
               }
           } else {
               NotificationBuilder.errorNotification("Error","Something went wrong");
           }
        });
    };

    const returnBack = () => {
        props.store.setCompanyScreen(GameScreenEnum.GAME);
    };

    let potentialWorkers = props.store.company.candidates.map(candidate => <PotentialWorker worker={candidate}
                                                                                            selectedId={selected}
                                                                                            onClick={onCandidateClick}/>);
    return (
        <div className="hire-screen flex-center">
            <div>Hire Screen</div>
            <div className="hire-workers-container">
                {potentialWorkers}
            </div>
            <div className="flex-center hire-workers-control">
                <div style={{marginRight: "1vmin"}}>
                    <Button variant="contained" onClick={hire}>Hire</Button>
                </div>
                <div>
                    <Button variant="contained" onClick={returnBack}>Return</Button>
                </div>

            </div>
        </div>
    )

}

export default observer(HireScreen);