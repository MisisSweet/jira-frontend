import React, { Component } from "react";
import CreateModal from "./create-modal";

export default class ModalAll extends Component {
    state = {
        isCompleted: false
    }
    render() {
        const { isCompleted } = this.state;
        const modal = isCompleted ? <CreateModal /> : <CreateModal />
        return (
            <div>
                {modal}
            </div>
        )
    }
}