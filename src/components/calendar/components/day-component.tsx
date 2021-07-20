import  React, { Component } from "react";
import { TypeDay } from "../../../services/data/typeDay";
import { Day } from "../../../services/models/Calendar/day";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalAll from "../../modal/modal";

interface DayComponentProps {
    date: Date,
    disable?: Boolean,
    selected?: Boolean,
    day?: Day,
    onClick?:Function
}
export class DayComponent extends Component<DayComponentProps> {

    state={
        open: false
    }
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleClick=()=>{
        const { onClick,date } = this.props;
        if(onClick){
            onClick(date);
            this.setState({ open: true });
        }
    }

    checkCurrentDay(date: Date) {
        var currentDate = new Date();
        return currentDate.getFullYear() === date.getFullYear()
            && currentDate.getMonth() === date.getMonth()
            && currentDate.getDate() === date.getDate();
    }

    getClassOfTypeDay() {
        const { day, date } = this.props;

        if (date.getDay() === 6 || date.getDay() === 0) {
            return ' calendar-day-holiday';
        }

        if (day) {
            switch (day.type) {
                case TypeDay.HOLIDAY:
                    return ' calendar-day-holiday';
                case TypeDay.SHORT_DAY:
                    return ' calendar-day-short';
                case TypeDay.SICK_DAY:
                    return ' calendar-day-sick';
                case TypeDay.VACATION:
                    return ' calendar-day-vacation';
            }
        }
        return '';
    }

    render() {
        const { date, disable,selected, day } = this.props;
        const disableClass = disable ? ' calendar-day-disable' : '';
        const typeDayClass = this.getClassOfTypeDay();
        const currentDayClass = this.checkCurrentDay(date) ? ' calendar-day-current' : '';
        const selectedDayClass = selected ? ' calendar-day-selected' : '';
        const { open } = this.state;
        return (
            <React.Fragment>
                <td className={ `calendar-day`.concat(disableClass,typeDayClass,currentDayClass,selectedDayClass)} onClick={this.handleClick}>
                <p className="calendar-day-date">
                    {date ? date.getDate() : 'x'}
                </p>
                <small className="calendar-day-work-hour">
                    {day ? day.timeSpent : ''}
                </small>
            </td>
            <Modal open={open} onClose={this.onCloseModal}>
                <ModalAll/>
            </Modal>
            </React.Fragment>
        )
    }
}