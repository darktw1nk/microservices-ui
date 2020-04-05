import React from 'react';
import {RootStoreType} from "../../model/store/RootStore";
import "../../../css/GameScreen.css"
import LeftContent from "./left/LeftContent";
import MainContent from "./content/MainContent";
import RightContent from "./right/RightContent";

interface Props {
    store: RootStoreType
}

function GameScreen(props: Props) {
    return (
        <div className="game-container">
            <LeftContent store={props.store}/>
            <MainContent store={props.store}/>
            <RightContent store={props.store}/>
        </div>
    );
}

export default GameScreen;