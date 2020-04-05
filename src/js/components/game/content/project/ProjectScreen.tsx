import React from 'react';
import {Project, RootStoreType} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import "../../../../../css/ProjectScreen.css";
import {observer} from "mobx-react";
import {Button, TextField} from "@material-ui/core";
import {GameScreenEnum} from "../../../../model/enum/GameScreenEnum";
import SelectableItem from "../../../util/selectable/SelectableItem";
import {types} from "mobx-state-tree";
import NotificationBuilder from "../../../../model/NotificationBuilder";

interface Props {
    store: RootStoreType
}

function ProjectScreen(props: Props) {



    const loadProjectTypes = () => {
        return ["RPG", "Shooter", "Strategy", "Action", "Platformer"];
    };

    const loadProjectGenres = () => {
        return ["Ninja", "MWSS", "Great war", "Limons", "Lovestory", "Medieval", "Prison", "Pigeons"];
    };

    const projectTypes = loadProjectTypes();
    const projectGenres = loadProjectGenres();

    const [selectedType, setSelectedType] = React.useState(projectTypes[0]);
    const [selectedGenre, setSelectedGenre] = React.useState(projectGenres[0]);
    const [projectName, setProjectName] = React.useState("");

    const startProject = () => {
        let request = {
            name: projectName,
            type: selectedType,
            genre: selectedGenre,
            companyId: props.store.company.id
        };

        fetch(props.store.baseUrl + "/api/project/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(response => {
            if(response.status===200){
                response.json().then((json:any) => {
                    props.store.company.setCurrentProject(Project.create({
                        id: json.id,
                        name: projectName,
                        type: selectedType,
                        genre: selectedGenre,
                        progress: 0,
                        designPoints: 0,
                        programmingPoints: 0,
                        marketingPoints: 0,
                        revenue: 0
                    }));
                }).catch(exception => {
                    NotificationBuilder.errorNotification("Error","Cant create new project");
                });
            } else {
                NotificationBuilder.errorNotification("Error","Cant create new project");
            }
        }).catch(exception => {
            NotificationBuilder.errorNotification("Error","Cant create new project");
        });
        props.store.setCompanyScreen(GameScreenEnum.GAME);
    };

    const cancelProject = () => {
        props.store.setCompanyScreen(GameScreenEnum.GAME);
    };

    const onNameChange = (event:any) => {
        setProjectName(event.target.value);
    };


    const projectTypeItems = projectTypes.map(type => <SelectableItem key={type} id={type} onClick={setSelectedType}
                                                                      className="project-selectable-item"
                                                                      selected={selectedType === type}>
        <div className="flex-center-column">
            <div>{type}</div>
            <div><img className="project-selectable-item-image" src="/images/project-type.svg"/></div>
        </div>
    </SelectableItem>);
    const projectGenreItems = projectGenres.map(genre => <SelectableItem key={genre} id={genre} onClick={setSelectedGenre}
                                                                         className="project-selectable-item"
                                                                         selected={selectedGenre === genre}>
        <div className="flex-center-column">
            <div>{genre}</div>
            <div><img className="project-selectable-item-image" src="/images/project-genre.svg"/></div>
        </div>
    </SelectableItem>);

    return (
        <div className="flex-center-column">
            <div><h2>New Project</h2></div>
            <div style={{width:"60vmin"}}>
                <TextField id="project-name" label="Project name" variant="outlined" fullWidth onChange={onNameChange}/>
            </div>
            <div className="project-type-container flex-center-column">
                <h3>Project Type</h3>
                <div className="flex-center project-grid">
                    {projectTypeItems}
                </div>
            </div>
            <div className="project-genre-container flex-center-column">
                <h3>Project Genre</h3>
                <div className="flex-center">
                    <div className="project-grid">{projectGenreItems}</div>
                </div>
            </div>
            <div className="project-controls flex-center">
                <Button variant="contained" onClick={startProject}>Start</Button>
                <div style={{width: "2vmin"}}></div>
                <Button variant="contained" onClick={cancelProject}>Cancel</Button>
            </div>
        </div>
    )

}

export default observer(ProjectScreen);