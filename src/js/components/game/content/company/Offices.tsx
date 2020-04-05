import React from 'react';
import {RootStoreType} from "../../../../model/store/RootStore";
import "../../../../../css/MainContent.css";
import Office from "./Office";

interface Props {
    store: RootStoreType
}

export default function Offices(props: Props) {

    return (
        <div className="offices">
            <div>Offices</div>
            <div className="office-list">
                <Office name="Design" store={props.store} workers={props.store.company.designOffice}/>
                <Office name="Development" store={props.store} workers={props.store.company.programmingOffice}/>
                <Office name="Marketing" store={props.store} workers={props.store.company.marketingOffice}/>
            </div>
        </div>
    )

}