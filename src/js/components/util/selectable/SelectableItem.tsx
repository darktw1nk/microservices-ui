import React from 'react';
import "../../../../css/Main.css";
import {RootStoreType} from "../../../model/store/RootStore";

interface Props {
    className?:string,
    selected: boolean,
    children: any,
    id:any,
    onClick(id:any):void
}

function SelectableItem(props: Props) {

    let style = {border:"2px solid black"};
    if(props.selected){
        style.border = "2px solid red";
    }

    const onClick = () => {
      props.onClick(props.id);
    };

    return (
        <div className={props.className} style={style} onClick={onClick}>
            {props.children}
        </div>
    );
}

export default SelectableItem;