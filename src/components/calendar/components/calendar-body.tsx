import { Component } from "react";
import '../calendar.css'
import MonthComponent from "./month-component";


interface CalendarBodyProps {
    onChangeSelectedDate?: Function,
}
export default class CalendarBody extends Component<CalendarBodyProps> {


    render() {
        return (
            <div className="calendar-body">
                <MonthComponent
                    onDayClick={this.handleChangeSelectedDay}
                />
            </div>
        )
    }

    handleChangeSelectedDay = (date: Date) => {
        const { onChangeSelectedDate } = this.props
        if (onChangeSelectedDate) {
            onChangeSelectedDate(date);
        }
        this.setState({
            selectedDate: date
        })
    }
}