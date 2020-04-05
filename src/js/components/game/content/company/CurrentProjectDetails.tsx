import React from 'react';
import {RootStoreType} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import {Button, lighten, LinearProgress, withStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import "../../../../../css/ProjectDetails.css";

interface Props {
    store: RootStoreType
}

const BorderLinearProgress = withStyles({
    root: {
        height: 30,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 0,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

function CurrentProjectDetails(props: Props) {
    let project = props.store.company.currentProject!;

    return (
        <div className="flex-center-column">
            <h3 style={{margin: "0vmin"}}>{"Name: "+project.name}</h3>
            <h4 style={{margin: "1vmin"}} className="flex-center">
                {"Type: " + project.type}
                <div style={{width:"1vmin"}}></div>
                {"Genre: " + project.genre}</h4>
            <div className="flex-center" style={{marginTop:"2vmin"}}>
                Progress:
                <div style={{width:"1vmin"}}></div>
                <div style={{width: "20vmin"}}>
                    <BorderLinearProgress
                        variant="determinate"
                        color="secondary"
                        value={project.progress}
                    />
                </div>

            </div>
            <div className="flex-center">
                <div className="flex-center point-container">
                    <img src="/images/design.svg" className="project-details-icon"/>
                    <div style={{width:"1vmin"}}></div>
                    Design:
                    {" "+project.designPoints}
                </div>
                <div className="flex-center point-container">
                    <img src="/images/programming.svg" className="project-details-icon"/>
                    <div style={{width:"1vmin"}}></div>
                    Programming:
                    {" "+project.programmingPoints}
                </div>
                <div className="flex-center point-container">
                    <img src="/images/marketing.svg" className="project-details-icon"/>
                    <div style={{width:"1vmin"}}></div>
                    Marketing:
                    {" "+project.marketingPoints}
                </div>
            </div>
        </div>

    )

}

export default observer(CurrentProjectDetails)