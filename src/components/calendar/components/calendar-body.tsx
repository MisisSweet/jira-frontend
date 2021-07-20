import { Component } from "react";
import '../calendar.css'
import MonthComponent from "./month-component";


interface CalendarBodyProps {
    onChangeSelectedDate?: Function,
    onDayDoubleClick?: Function,
    onProjectClick?: Function,
}
export default class CalendarBody extends Component<CalendarBodyProps> {


    render() {
        const { onChangeSelectedDate, onDayDoubleClick, onProjectClick } = this.props;
        return (
            <div className="calendar-body">
                <MonthComponent
                    onDayClick={onChangeSelectedDate}
                    onDayDoubleClick={onDayDoubleClick}
                    onProjectClick={onProjectClick}
                />
            </div>
        )
    }
}