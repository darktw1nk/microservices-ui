import React from 'react';
import {RootStoreType, Worker} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import "../../../../../css/HireScreen.css";
import {observer} from "mobx-react";


interface Props {
    worker: Worker,
    selectedId: number,
    onClick(selectedId:number):void
}

function PotentialWorker(props: Props) {

    let style = {
        border: "2px solid black"
    };
    if(props.selectedId===props.worker.id){
        style.border = "2px solid red"
    }

    const onClick = () => {
        props.onClick(props.worker.id);
    };

    return (
        <div className="flex-center-column potential-worker" style={style} onClick={onClick}>
            <img alt={"worker"} src={"/images/worker-" + props.worker.type + ".svg"} className="potential-worker-image"/>
            <div><h3 style={{textAlign:"center"}}>{props.worker.name}</h3></div>
            <div className="flex-center">
                <img src="/images/design.svg" className="hire-icon"/>
                <div>{props.worker.design}</div>
                <div style={{width:"1vmin"}}></div>
                <img src="/images/programming.svg" className="hire-icon"/>
                <div>{props.worker.programming}</div>
                <div style={{width:"1vmin"}}></div>
                <img src="/images/marketing.svg" className="hire-icon"/>
                <div>{props.worker.marketing}</div>
            </div>
            <div><h3>Salary:{" "+props.worker.salary}</h3></div>
        </div>
    )

}

export default observer(PotentialWorker);