import React from 'react';
import {RootStoreType, Worker} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import "../../../../../css/WorkerScreen.css";
import {worker} from "cluster";
import {Button} from "@material-ui/core";

interface Props {
    buttonClick: (workerId:number|null) => void,
    worker: Worker| null
}

export default function WorkerScreen(props: Props) {
    let name = "Empty place";
    let avatar = "/images/question.svg";
    let design = 0;
    let programming = 0;
    let marketing = 0;
    let buttonText = "Hire";
    if(props.worker!==null){
        name = props.worker.name;
        avatar = "/images/worker-" + props.worker.type + ".svg";
        design = props.worker.design;
        programming = props.worker.programming;
        marketing = props.worker.marketing;
        buttonText = "Fire";
    }

    const buttonClick = () => {
        let id = null;
        if(props.worker!==null){
            id=props.worker.id;
        }
        props.buttonClick(id);
    };


    return (
        <div className="worker-screen-container">
            <div className="flex-center">
                <div ><img src={avatar} alt={"avatar"} className="worker-avatar"/></div>
                <div className="flex-center worker-screen-description">
                    <div className="description-point">{name}</div>
                    <h3 className="description-point">Skills</h3>
                    <h4 className="description-point">Design: {" "+design}</h4>
                    <h4 className="description-point">Programming: {" "+programming}</h4>
                    <h4 className="description-point">Marketing: {" "+marketing}</h4>
                </div>
            </div>
            <div>
                <Button variant="contained" onClick={buttonClick}>{buttonText}</Button>
            </div>
        </div>
    )

}