import React, { Component } from "react";
import { TypeDay } from "../../../services/data/typeDay";
import { Day } from "../../../services/models/Calendar/day";
import "react-responsive-modal/styles.css";
import { Worklogs } from "../../../services/models/Worklog/worklog";

interface DayComponentProps {
    date: Date,
    disable?: Boolean,
    selected?: Boolean,
    day?: Day,
    onClick?: Function,
    onDoubleClick?: Function,
    onClickProject?: Function
}
export class DayComponent extends Component<DayComponentProps> {

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleClick = () => {
        const { onClick, date } = this.props;
        if (onClick) {
            onClick(date);
        }
    }
    handleDoubleClick = () => {
        const { onDoubleClick, date } = this.props;
        if (onDoubleClick) {
            onDoubleClick(date);
        }
    }
    handleClickProject = (worklog: Worklogs) => {
        const { onClickProject, date } = this.props;
        if (onClickProject) {
            onClickProject(worklog, date);
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
        const { date, disable, selected, day } = this.props;
        const disableClass = disable ? ' calendar-day-disable' : '';
        const typeDayClass = this.getClassOfTypeDay();
        const currentDayClass = this.checkCurrentDay(date) ? ' calendar-day-current' : '';
        const selectedDayClass = selected ? ' calendar-day-selected' : '';

        const hourWork = day?.worklog.reduce((sum, w) => {
            const value = w.timeSpent.split(' ').reduce(
                (sum, value) => {
                    let number = parseFloat(value)
                    let chapter = value.substr(-1)
                    let multiplier = 1;
                    if (chapter === 'd') {
                        multiplier = 8;
                    }
                    if (chapter === 'm') {
                        multiplier = 1 / 60;
                    }
                    return sum + (number * multiplier);
                }, 0
            )
            return sum + value
        }, 0);
        const procesHours = hourWork ? ((hourWork > 8) ? ' proces' : '') : '';
        const projectHours = day?.worklog.map(w => <div
            key={w.id}
            onClick={() => this.handleClickProject(w)}>{w.project + ' ' + w.timeSpent}</div>);
        return (
            <td className={`calendar-day`.concat(disableClass, typeDayClass, currentDayClass, selectedDayClass)}
                onDoubleClick={this.handleDoubleClick}
                onClick={this.handleClick}>
                <p className="calendar-day-date">
                    {date ? date.getDate() : 'x'}
                </p>
                <small className={`calendar-day-work-hour`.concat(procesHours)}>
                    {day ? (hourWork ? (hourWork <= 12 ? hourWork : 12) + " h" : '') : ''}
                </small>
                {day ? <div className="calendar-day-work-hour-project">
                    {projectHours}
                </div> : ''}
            </td>
        )
    }

}