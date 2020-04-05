import React from 'react';
import "../../../css/Main.css"
import "../../../css/LoginScreen.css"
import {TextField, Button} from "@material-ui/core";
import {RootStoreType} from "../../model/store/RootStore";
import {ScreenEnum} from "../../model/enum/ScreenEnum";
import NotificationBuilder from "../../model/NotificationBuilder";


interface Props {
    store: RootStoreType
}

function RegistrationScreen(props: Props) {
    const [companyName, setCompanyName] = React.useState("");
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    function onRegister() {


        let request = {
            companyName: companyName,
            login: login,
            password: password
        };

        fetch(props.store.baseUrl + "/api/user/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                NotificationBuilder.successNotification("Success", "You will be redirected soon");
                setTimeout(function () {
                    props.store.setScreen(ScreenEnum.LOGIN);
                },3000);
            } else {
                NotificationBuilder.errorNotification("Error","Something wrong happened");
            }

        }).catch(error => {
            console.log(error);
            NotificationBuilder.errorNotification("Error","Something wrong happened");
        });
    }

    function onCancel() {
        props.store.setScreen(ScreenEnum.LOGIN);
    }

    const onCompanyNameChange = (event: any) => {
        setCompanyName(event.target.value);
    };

    const onLoginChange = (event: any) => {
        setLogin(event.target.value);
    };

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    return (
        <div className="login-container">
            <div className="login-info-container">
                <div>Registration</div>
                <div style={{height: "1vmin"}}></div>
                <TextField id="company-name" label="Company name" variant="outlined" onChange={onCompanyNameChange}/>
                <div style={{height: "1vmin"}}></div>
                <TextField id="outlined-basic" label="Login" variant="outlined" onChange={onLoginChange}/>
                <div style={{height: "1vmin"}}></div>
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={onPasswordChange}/>
                <div className="horizontal-flex-out" style={{width: "20vmin", marginTop: "2vmin"}}>
                    <Button variant="contained" onClick={onRegister}>Register</Button>
                    <Button variant="contained" onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default RegistrationScreen;