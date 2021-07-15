import { Component } from "react";
import { Month } from "../../services/models/Calendar/month";
import { WeekComponent } from "./week-component";

interface MonthComponentProps {
    number: number,
    year: number,
    month?: Month,
}
var weeksCount = function (year: number, month_number: number) {
    var firstOfMonth = new Date(year, month_number, 1);
    var day = firstOfMonth.getDay() || 6;
    day = day === 1 ? 0 : day;
    if (day) { day-- }
    var diff = 7 - day;
    var lastOfMonth = new Date(year, month_number + 1, 0);
    var lastDate = lastOfMonth.getDate();
    if (lastOfMonth.getDay() === 1) {
        diff--;
    }
    var result = Math.ceil((lastDate - diff) / 7);
    return result + 1;
};

export class MonthComponent extends Component<MonthComponentProps>{
    render() {
        const { year, number, month } = this.props;
        const countWeeks = weeksCount(year, number)

        const lastDateOfMonth = new Date(year, number + 1, 0).getDate();

        return (
            <table className="calendar-month w-100">
                <thead className="calendar-month-header">
                    <tr>
                        <td>№</td>
                        <td>пн</td>
                        <td>вт</td>
                        <td>ср</td>
                        <td>чт</td>
                        <td>пт</td>
                        <td>сб</td>
                        <td>вс</td>
                    </tr>
                </thead>
                <tbody className="calendar-month-body">
                    {Array.apply(0, Array(countWeeks)).map((v, i) => {
                        var dt = new Date(year, number, (1 + 7 * i) % lastDateOfMonth);
                        var firstDayOfWeek = new Date(dt.setDate(dt.getDate() - dt.getDay() + 1));
                        return <WeekComponent number={i + 1} firstDay={firstDayOfWeek} week={month?.weeks[i]} key={i} />
                    })}
                </tbody>
            </table>
        )
    }


}