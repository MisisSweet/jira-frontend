import React, { Component } from "react";
import { Worklogs } from "../../services/models/Worklog/worklog";
import CreateModal from "./create-modal";

interface ModalAllProps {
    date: Date,
    worklog?: Worklogs,
    onClose?: Function,
}

export default class ModalAll extends Component<ModalAllProps> {
    state = {
        isCompleted: false
    }
    render() {
        const { date, worklog, onClose } = this.props;
        console.log({ date, worklog })
        return (
            <div>
                <CreateModal
                    date={date}
                    worklog={worklog}
                    onClose={onClose} />
            </div>
        )
    }
}