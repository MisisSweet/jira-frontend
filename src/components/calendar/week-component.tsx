import { Component } from "react";
import { Week } from "../../services/models/Calendar/week";
import { DayComponent } from "./day-component";

function addDays(date: Date, days: number): Date {
    var copiedDate = new Date(date.getTime())
    copiedDate.setDate(copiedDate.getDate() + days);
    return copiedDate;
}

interface WeekComponentProps {
    number: number,
    firstDay: Date,
    week?: Week,
}
export class WeekComponent extends Component<WeekComponentProps> {
    render() {
        const { number, week, firstDay } = this.props;
        const lastDate = addDays(firstDay, 6).getDate();
        return (
            <tr className="calendar-week">
                <td className="calendar-week-header">
                    {number}
                </td>
                {Array.apply(0, Array(7)).map((v, i) => {
                    const date = addDays(firstDay, i);
                    var disable = false;
                    if (number === 1) {
                        disable = date.getDate() > lastDate;
                    } else {
                        disable = date.getDate() < firstDay.getDate();
                    }
                    return <DayComponent disable={disable} day={week?.days[i]} date={date} key={i}/>
                })}
            </tr>
        )
    }
}