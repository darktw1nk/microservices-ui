import React from 'react';
import {observer} from "mobx-react";
import '../../css/App.css';
import LoginScreen from "./login/LoginScreen";
import {RootStoreType} from "../model/store/RootStore";
import {ScreenEnum} from "../model/enum/ScreenEnum";
import RegistrationScreen from "./registration/RegistrationScreen";
import GameScreen from "./game/GameScreen";
// @ts-ignore
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
interface State {

}

interface Props {
    store: RootStoreType
}

class App extends React.Component<Props, State> {
    render() {
        let screen = this.props.store.screen;
        let componentToDraw: any = null;
        switch (screen) {
            case ScreenEnum.LOGIN:
                componentToDraw = <LoginScreen store={this.props.store}/>;
                break;
            case ScreenEnum.REGISTRATION:
                componentToDraw = <RegistrationScreen store={this.props.store}/>;
                break;
            case ScreenEnum.GAME:
            default:
                componentToDraw = <GameScreen store={this.props.store}/>
        }

        return (
            <React.Fragment>
                <div>
                    <ReactNotification />
                    {componentToDraw}
                </div>
            </React.Fragment>
        );
    }


}

export default observer(App);
