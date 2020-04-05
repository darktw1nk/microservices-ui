import React from 'react';
import {RootStoreType} from "../../../model/store/RootStore";
import "../../../../css/MainContent.css";
import CurrentProject from "./company/CurrentProject";
import Offices from "./company/Offices";
import {GameScreenEnum} from "../../../model/enum/GameScreenEnum";
import HireScreen from "./hire/HireScreen";
import ProjectScreen from "./project/ProjectScreen";
import CompanyScreen from "./company/CompanyScreen";
import {observer} from "mobx-react";

interface Props {
    store: RootStoreType
}

function MainContent(props: Props) {
    let screen:any = '';
    switch (props.store.companyScreen) {
        case GameScreenEnum.HIRE:
            screen = <HireScreen store={props.store}/>;
            break;
        case GameScreenEnum.NEW_PROJECT:
            screen = <ProjectScreen store={props.store}/>;
            break
        case GameScreenEnum.GAME:
        default:
            screen = <CompanyScreen store={props.store}/>;
    }

    return (
        <React.Fragment>
            {screen}
        </React.Fragment>
    );
}

export default observer(MainContent);