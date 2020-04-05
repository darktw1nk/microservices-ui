import React from 'react';
import {RootStoreType, Worker} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import {observer} from "mobx-react";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import WorkerScreen from "./WorkerScreen";

interface Props {
    worker: Worker | null,
    buttonClick: (workerId:number|null) => void
}

function WorkPlace(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("handle close");
        setOpen(false);
    };

    let worker: any = '';
    if (props.worker) {
        worker = <img src={"/images/worker-" + props.worker.type + ".svg"} alt="worker" className="worker-image"
                      onClick={handleOpen}/>
    }

    return (
        <div className="work-place">
            <img src="/images/chair.svg" className="chair-image" alt="chair" onClick={handleOpen}/>
            {worker}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="flex-center"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="worker-modal">
                        <WorkerScreen worker={props.worker} buttonClick={props.buttonClick}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )

}

export default observer(WorkPlace);
