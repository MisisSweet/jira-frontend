import { Component } from "react";
import { Day } from "../../../services/models/Calendar/day";
import { Week } from "../../../services/models/Calendar/week";
import { DayComponent } from "./day-component";
const moment = require('moment');

function addDays(date: Date, days: number): Date {
    var copiedDate = new Date(date.getTime())
    copiedDate.setDate(copiedDate.getDate() + days);
    return copiedDate;
}

function compareDates(dateA: Date, dateB?: Date): Boolean {
    const d = new Date(dateA);
    if (!dateB) {
        return false;
    }
    return d.getFullYear() === dateB.getFullYear()
        && d.getMonth() === dateB.getMonth()
        && d.getDate() === dateB.getDate();;
}

interface WeekComponentProps {
    firstDay: Date,
    numberOfMonth: number,
    week?: Week,
    selectedDate?: Date,
    onDayClick?: Function
    onDayDoubleClick?: Function
    onProjectClick?: Function
}
export class WeekComponent extends Component<WeekComponentProps> {
    render() {
        const { week, firstDay, selectedDate, numberOfMonth, onDayClick, onProjectClick, onDayDoubleClick } = this.props;
        const lastDate = addDays(firstDay, 6).getDate();
        const numberOfYaer = moment(firstDay).format('W')
        return (
            <tr className="calendar-week">
                <td className="calendar-week-header">
                    {numberOfYaer}
                </td>
                {Array.apply(0, Array(7)).map((v, i) => {
                    const date = addDays(firstDay, i);
                    var disable = false;
                    if (numberOfMonth === 1) {
                        disable = date.getDate() > lastDate;
                    } else {
                        disable = date.getDate() < firstDay.getDate();
                    }
                    return <DayComponent
                        key={i}
                        disable={disable}
                        selected={compareDates(date, selectedDate)}
                        day={week?.days.find((value: Day) => compareDates(value.day, date))}
                        date={date}
                        onClick={onDayClick}
                        onDoubleClick={onDayDoubleClick}
                        onClickProject={onProjectClick}
                    />
                })}
            </tr>

        )
    }
}