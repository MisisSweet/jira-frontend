import { Component } from "react";
import { Month } from "../../../services/models/Calendar/month";
import { Week } from "../../../services/models/Calendar/week";
import { WeekComponent } from "./week-component";
import { CalendarContext } from '../calendar-context'
import { Year } from "../../../services/models/Calendar/year";
import moment from "moment";
interface MonthComponentProps {
    onDayClick?: Function
    onDayDoubleClick?: Function
    onProjectClick?: Function
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

class MonthComponent extends Component<MonthComponentProps>{
    render() {
        // const { year, number, month, selectedDate, onDayClick } = this.props;
        return (
            <table className="calendar-month w-100 table table-hover">
                <thead className="calendar-month-header">
                    <tr>
                        <td></td>
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
                    {this.build()}
                </tbody>
            </table>
        )
    }

    build() {

        const { selectedMonth, selectedWeek, selectedYear, weekMode } = this.context;
        const countWeeks = weeksCount(selectedYear, selectedMonth)
        const lastDateOfMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();


        if (weekMode) {
            const number = selectedWeek - moment(new Date(selectedYear, 0, (1 + (selectedWeek * 7)))).startOf('month').week() + 1;
            return this.buildWeek(number, lastDateOfMonth, countWeeks);
        }
        return Array.apply(0, Array(countWeeks)).map((v, i) => {
            return this.buildWeek(i, lastDateOfMonth, countWeeks);
        })
    }
    buildWeek(number: number, lastDateOfMonth: number, countWeeks: number) {
        const { onDayClick, onProjectClick, onDayDoubleClick } = this.props;
        const { selectedDate, selectedMonth, selectedYear, years } = this.context;
        const year = years?.find((value: Year) => value.number === selectedYear)
        const month = year?.months.find((value: Month) => value.number === selectedMonth);

        let day = (0 + (7 * number)) % lastDateOfMonth, monthNumber = selectedMonth;
        if (number === countWeeks - 1 && day < 7) {
            monthNumber++;
        }
        var dt = new Date(selectedYear, monthNumber, day);
        var firstDayOfWeek = new Date(dt.setDate(dt.getDate() - dt.getDay() + 1));

        return <WeekComponent
            key={number}
            numberOfMonth={number + 1}
            firstDay={firstDayOfWeek}
            week={month?.weeks.find((value: Week) => value.number === number + 1)}
            selectedDate={selectedDate}
            onDayClick={onDayClick}
            onDayDoubleClick={onDayDoubleClick}
            onProjectClick={onProjectClick}
        />
    }
}

MonthComponent.contextType = CalendarContext;

export default MonthComponent;