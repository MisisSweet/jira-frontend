import { Component } from "react";
import './calendar.css'
import { MonthComponent } from "./month-component";


interface CalendarState {
    currentDay: Date,
    selectedYear: number,
    selectedMonth: number,
}
interface CalendarProps {
}
export default class Calendar extends Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            currentDay: new Date(),
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear()
        }
    }
    render() {
        const { selectedYear, selectedMonth } = this.state;
        const date = new Date(`${selectedYear}-${selectedMonth + 1}-1`)
        //здесь можно будет замутить локализацию
        let mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(date);
        let ye = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(date);

        return (
            <div className="calend">
                <div className="calendar-header d-flex">
                    <button className="btn btn-primary" onClick={() => { this.changeYear(-1) }}>←</button>
                    <div className="calendar-header-title">
                        {ye}
                    </div>
                    <button  className="btn btn-primary" onClick={() => { this.changeYear(1) }}>→</button>
                </div>
                <div className="calendar-header d-flex">
                    <button className="btn btn-primary" onClick={() => { this.changeMonth(-1) }}>←</button>
                    <div className="calendar-header-title">
                        {mo}
                    </div>
                    <button  className="btn btn-primary" onClick={() => { this.changeMonth(1) }}>→</button>
                </div>
                <div className="calendar-body">
                    <MonthComponent number={selectedMonth} year={selectedYear} />
                </div>
            </div>
        )
    }

    changeMonth(value: number) {
        const { selectedMonth, selectedYear } = this.state;
        var newMonth = selectedMonth + value;
        var newYear = selectedYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        this.setState({
            selectedMonth: newMonth,
            selectedYear: newYear,
        })
    }

    changeYear(value: number) {
        this.setState({
            selectedYear: this.state.selectedYear + value,
        })
    }
}