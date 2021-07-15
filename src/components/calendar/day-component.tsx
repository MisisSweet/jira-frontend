import { Component } from "react";
import { Day } from "../../services/models/Calendar/day";

interface DayComponentProps {
    date: Date,
    disable: Boolean,
    day?: Day,
}
export class DayComponent extends Component<DayComponentProps> {
    render() {
        const { date, disable } = this.props;
        const disableClass = disable ? 'calendar-day-disable' : '';
        const holidayClass = date.getDay() === 6 || date.getDay() === 0 ? 'calendar-day-holiday' : '';
        return (
            <td className={`calendar-day ${disableClass} ${holidayClass}`}>
                {date ? date.getDate() : 'x'}
            </td>
        )
    }
}