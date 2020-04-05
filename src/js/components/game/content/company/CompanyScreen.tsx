import React from 'react';
import {RootStoreType} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import CurrentProject from "../company/CurrentProject";
import Offices from "../company/Offices";
import {observer} from "mobx-react";

interface Props {
    store: RootStoreType
}

function CompanyScreen(props: Props) {
    return (
        <div className="main-container">
            <CurrentProject store={props.store}/>
            <div></div>
            <Offices store={props.store}/>
        </div>
    );
}

export default observer(CompanyScreen);