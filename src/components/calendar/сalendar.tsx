import { Component } from "react";
import { Month } from "../../services/models/Calendar/month";
import { Year } from "../../services/models/Calendar/year";
import './calendar.css'
import { MonthComponent } from "./month-component";


interface CalendarState {
    selectedDate: Date,
    selectedYear: number,
    selectedMonth: number,
}
interface CalendarProps {
    years?: Array<Year>,
    selectedDate?: Date,
    onChangeSelectedDate?: Function,
    onChangeSelectedMonth?: Function,
    onChangeSelectedYear?: Function,
}
export default class Calendar extends Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);
        const {selectedDate} = props;
        var date = selectedDate ||new Date();

        this.state = {
            selectedDate: date,
            selectedMonth: date.getMonth(),
            selectedYear: date.getFullYear()
        }
    }

    render() {
        const { selectedYear, selectedMonth,selectedDate } = this.state;
        const { years } = this.props;
        const selectYear = years?.find((value: Year) => value.number === selectedYear)
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
                <MonthComponent 
                number={selectedMonth} 
                year={selectedYear} 
                month={selectYear?.months.find((value: Month) => value.number === selectedMonth)} 
                selectedDate={selectedDate}
                onDayClick={this.handleChangeSelectedDay}
                />
            </div>
            </div>
        )
    }
    handleChangeSelectedDay=(date:Date)=>{
        const {onChangeSelectedDate} = this.props
        if(onChangeSelectedDate){
            onChangeSelectedDate(date);
        }
        this.setState({
            selectedDate:date
        })
    }
    changeMonth=(value: number)=> {
        const { selectedMonth, selectedYear } = this.state;
        const { onChangeSelectedMonth} = this.props;
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
        if(newYear!==selectedYear){
            this.changeYear(newYear);
        }
        if(onChangeSelectedMonth){
            onChangeSelectedMonth(newMonth);
        }
        this.setState({
            selectedMonth: newMonth,
        })
    }

    changeYear(value: number) {
        const { onChangeSelectedYear} = this.props;
        console.log(value)
        if(onChangeSelectedYear){
            onChangeSelectedYear(value);
        }
        this.setState({
            selectedYear: value,
        })
    }
}