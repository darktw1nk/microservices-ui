import React from 'react';
import "../../../css/Main.css"
import "../../../css/LoginScreen.css"
import {TextField, Button} from "@material-ui/core";
import {Project, RootStoreType, Worker} from "../../model/store/RootStore";
import {ScreenEnum} from "../../model/enum/ScreenEnum";
import NotificationBuilder from "../../model/NotificationBuilder";
import ProjectWebSocket from "../../model/websocket/ProjectWebSocket";
import StatisticsWebSocket from "../../model/websocket/StatisticsWebSocket";

interface Props {
    store: RootStoreType
}

function LoginScreen(props: Props) {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    function onLogin() {
        let request = {
            login: login,
            password: password
        };

        fetch(props.store.baseUrl + "/api/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                NotificationBuilder.successNotification("Success", "You will be redirected soon");
                response.json().then(json => {
                    props.store.setUserHash(json.token);
                    loadCompanyInfo();
                    loadProjectInfo();
                    ProjectWebSocket.getInstance().connect(json.token);
                    StatisticsWebSocket.getInstance().connect(json.token);
                });
                setTimeout(function () {
                    props.store.setScreen(ScreenEnum.GAME);
                }, 3000);
            } else if (response.status === 403) {
                NotificationBuilder.errorNotification("Error", "Wrong password");
            } else {
                NotificationBuilder.errorNotification("Error", "Something wrong happened");
            }

        }).catch(error => {
            console.log(error);
            NotificationBuilder.errorNotification("Error", "Something wrong happened");
        });
    }

    async function loadCompanyInfo() {
        try {
            let companyInfoResponse = await fetch(props.store.baseUrl + "/api/company/hash/" + props.store.userHash);
            let companyInfo = await companyInfoResponse.json();
            console.log(companyInfo);
            let store = props.store;
            store.company.setId(companyInfo.id);
            store.company.setName(companyInfo.name);
            store.company.setMoney(companyInfo.money);
            store.company.setPreviousMoney(companyInfo.money);
            store.company.clearOffices();
            companyInfo.designers.map((designer: any) => {
                let workerId = designer.workerId;
                fetch(props.store.baseUrl + "/api/worker/" + workerId).then(response => {
                    response.json().then(worker => {
                        store.company.addDesigner(Worker.create({
                            id: worker.id,
                            name: worker.name,
                            type: worker.type,
                            design: worker.design,
                            programming: worker.programming,
                            marketing: worker.marketing,
                            salary: worker.salary
                        }));
                    });
                });
            });
            companyInfo.programmers.map((designer: any) => {
                let workerId = designer.workerId;
                fetch(props.store.baseUrl + "/api/worker/" + workerId).then(response => {
                    response.json().then(worker => {
                        store.company.addProgrammer(Worker.create({
                            id: worker.id,
                            name: worker.name,
                            type: worker.type,
                            design: worker.design,
                            programming: worker.programming,
                            marketing: worker.marketing,
                            salary: worker.salary
                        }));
                    });
                });
            });
            companyInfo.marketers.map((designer: any) => {
                let workerId = designer.workerId;
                fetch(props.store.baseUrl + "/api/worker/" + workerId).then(response => {
                    response.json().then(worker => {
                        store.company.addMarketer(Worker.create({
                            id: worker.id,
                            name: worker.name,
                            type: worker.type,
                            design: worker.design,
                            programming: worker.programming,
                            marketing: worker.marketing,
                            salary: worker.salary
                        }));
                    });
                });
            });
        } catch (e) {
            console.log(e);
            NotificationBuilder.errorNotification("Error", "Something wrong happened");
        }
    }

    async function loadProjectInfo() {
        let projectInfoResponse = await fetch(props.store.baseUrl + "/api/project/currentProject/" + props.store.userHash);
        if (projectInfoResponse.status === 200) {
            let json = await projectInfoResponse.json();
            props.store.company.setCurrentProject(Project.create(json));
        }
    }

    function onRegister() {
        props.store.setScreen(ScreenEnum.REGISTRATION);
    }

    const onLoginChange = (event: any) => {
        setLogin(event.target.value);
    };

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    return (
        <div className="login-container">
            <div className="login-info-container">
                <div>Login</div>
                <div style={{height: "1vmin"}}></div>
                <TextField id="outlined-basic" label="Login" variant="outlined" onChange={onLoginChange}/>
                <div style={{height: "1vmin"}}></div>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
                           onChange={onPasswordChange}/>
                <div className="horizontal-flex-out" style={{width: "20vmin", marginTop: "2vmin"}}>
                    <Button variant="contained" onClick={onLogin}>Login</Button>
                    <Button variant="contained" onClick={onRegister}>Register</Button>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;