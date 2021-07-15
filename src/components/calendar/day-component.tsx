import { Component } from "react";
import { Day } from "../../services/models/Calendar/day";

interface DayComponentProps {
    date: Date,
    disable: Boolean,
    day?: Day,
}
export class DayComponent extends Component<DayComponentProps> {

    checkCurrentDay(date: Date) {
        var currentDate = new Date();
        return currentDate.getFullYear() === date.getFullYear()
            && currentDate.getMonth() === date.getMonth()
            && currentDate.getDate() === date.getDate();
    }

    render() {
        const { date, disable } = this.props;
        const disableClass = disable ? 'calendar-day-disable' : '';
        const holidayClass = date.getDay() === 6 || date.getDay() === 0 ? 'calendar-day-holiday' : '';
        const currentClass = this.checkCurrentDay(date) ? 'calendar-day-current' : '';
        return (
            <td className={`calendar-day ${disableClass} ${holidayClass} ${currentClass}`}>
                {date ? date.getDate() : 'x'}
            </td>
        )
    }
}