import React, {Component} from "react";
import "../../css/Close.css";

class CloseComponent extends Component {

    render() {

        return (
            <div className="close-container" onClick={this.close}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
            </div>
        );
    }

    close = () => {
        this.props.onClose();
    }

}

export default CloseComponent;