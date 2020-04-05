import React from 'react';
import {RootStoreType} from "../../../model/store/RootStore";
import "../../../../css/LeftScreen.css"
import {observer} from "mobx-react";

interface Props {
    store: RootStoreType
}

function LeftContent(props: Props) {

    let previousMoney = props.store.company.previousMoney;
    let money = props.store.company.money;
    let moneyClassName = "";
    if(money!==previousMoney){
        let store:RootStoreType = props.store;
        if(money > previousMoney){
            moneyClassName = "money-goes-up";
        } else {
            moneyClassName = "money-goes-down"
        }
        setTimeout(function () {
            store.company.setPreviousMoney(store.company.money);
        },3000);
    }

    return (
        <div className="left-container">
            <div style={{marginTop:"2vmin"}}>
                <img src="/images/logo.jpg" className="logo"/>
            </div>
            <div>
                <h2>{props.store.company.name}</h2>
            </div>
            <div className={moneyClassName}>
                Money: {props.store.company.money}
            </div>
        </div>
    );
}

export default observer(LeftContent);