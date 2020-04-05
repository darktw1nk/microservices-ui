import React from 'react';
import {RootStoreType} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import {Button} from "@material-ui/core";
import {GameScreenEnum} from "../../../../model/enum/GameScreenEnum";
import CurrentProjectDetails from "./CurrentProjectDetails";
import {observer} from "mobx-react";

interface Props {
    store: RootStoreType
}

function CurrentProject(props: Props) {
    let projectExists = props.store.company.currentProject !== null;

    const startProject = () => {
        props.store.setCompanyScreen(GameScreenEnum.NEW_PROJECT);
    };

    return (
        <div className="current-project">
            <div><h2>Current Project</h2></div>
            {!projectExists && <Button variant="contained" onClick={startProject}>Start New Project</Button>}
            {projectExists &&
            <div>
                <CurrentProjectDetails store={props.store}/>
            </div>
            }
        </div>
    )

}

export default observer(CurrentProject);