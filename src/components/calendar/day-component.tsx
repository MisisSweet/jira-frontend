import { Component } from "react";
import { TypeDay } from "../../services/data/typeDay";
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

    getClassOfTypeDay() {
        const { day, date } = this.props;

        if (date.getDay() === 6 || date.getDay() === 0) {
            return 'calendar-day-holiday';
        }

        if (day) {
            switch (day.type) {
                case TypeDay.HOLIDAY:
                    return 'calendar-day-holiday';
                case TypeDay.SHORT_DAY:
                    return 'calendar-day-short';
                case TypeDay.SICK_DAY:
                    return 'calendar-day-sick';
                case TypeDay.VACATION:
                    return 'calendar-day-vacation';
            }
        }
        return '';
    }

    render() {
        const { date, disable, day } = this.props;
        const disableClass = disable ? 'calendar-day-disable' : '';
        const holidayClass = date.getDay() === 6 || date.getDay() === 0 ? 'calendar-day-holiday' : '';
        const currentClass = this.checkCurrentDay(date) ? 'calendar-day-current' : '';
        return (
            <td className={`calendar-day ${disableClass} ${holidayClass} ${currentClass}`}>
                <p className="calendar-day-date">
                    {date ? date.getDate() : 'x'}
                </p>
                <small className="calendar-day-work-hour">
                    {day ? day.workHours : 0}
                </small>
            </td>
        )
    }
}