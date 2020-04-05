import React from 'react';
import {observer} from "mobx-react";
import {RootStoreType, Worker} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import WorkPlace from "./WorkPlace";
import {GameScreenEnum} from "../../../../model/enum/GameScreenEnum";
import NetworkBuilder from "../../../../model/NetworkBuilder";

interface Props {
    store: RootStoreType,
    name: string,
    workers: any
}

function Office(props: Props) {

    const buttonClick = (id:number|null) => {
      if(id===null){
          props.store.company.setHiringOffice(props.name.toLowerCase());
          props.store.setCompanyScreen(GameScreenEnum.HIRE);
      } else {
          NetworkBuilder.getInstance().makeFireRequest(id,props.name.toLowerCase());
      }
    };

    let workers = props.workers.map((worker: Worker | null,index:number) => <WorkPlace key={index} worker={worker} buttonClick={buttonClick}/>);
    while (workers.length<20){
        workers.push(<WorkPlace key={workers.length+1} worker={null} buttonClick={buttonClick}/>);
    }

    return (
        <div className="office">
            <div>{props.name}</div>
            <div className="flex-center">
                {workers.slice(0,5)}
            </div>
            <div className="flex-center">
                {workers.slice(5,10)}
            </div>
            <div className="flex-center">
                {workers.slice(10,15)}
            </div>
            <div className="flex-center">
                {workers.slice(15,20)}
            </div>
        </div>
    )

}

export default observer(Office);