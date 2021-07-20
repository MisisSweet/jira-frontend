import React from "react";
import { Component } from "react";
import { json } from "../../services/json/json";
import { Year } from "../../services/models/Calendar/year";
import { CalendarContext } from "./calendar-context";
import './calendar.css'
import CalendarBody from "./components/calendar-body";
const moment = require('moment');

interface CalendarProps {
    selectedDate?: Date,
    onChangeSelectedDate?: Function,
    onChangeSelectedMonth?: Function,
    onChangeSelectedWeek?: Function,
    onChangeSelectedYear?: Function,
}
interface CalendarState {
    years: Array<Year>,
    weekMode: boolean,
    selectedYear: number,
    selectedMonth: number,
    selectedWeek: number,
    selectedDate: Date
}


export default class Calendar extends Component<CalendarProps, CalendarState>{
    constructor(props: CalendarProps) {
        super(props)
        const { selectedDate } = props;
        var date = selectedDate || new Date();
        const momentDate = moment(date);

        this.state = {
            years: JSON.parse(json),
            weekMode: true,
            selectedYear: Number(momentDate.format('YYYY')),
            selectedMonth: Number(momentDate.format('M')) - 1,
            selectedWeek: Number(momentDate.format('W')),
            selectedDate: date
        }
    }

    render() {
        const { weekMode, years, selectedDate, selectedMonth, selectedWeek, selectedYear } = this.state;

        //здесь можно будет замутить локализацию
        const momentDate = moment(new Date(`${selectedYear}-${selectedMonth + 1}-1`))
        let mo = momentDate.format('MMMM');
        let ye = momentDate.format('YYYY');
        const contextValue = {
            years,
            weekMode,
            selectedDate,
            selectedMonth,
            selectedWeek,
            selectedYear
        };
        return (
            <CalendarContext.Provider value={contextValue}>
                <div>
                    <div className="d-flex form-button m-2">
                        <button className="btn btn-primary m-1 mt-0 mb-0" onClick={e => this.setWeekMode(true)}>Неделя</button>
                        <button className="btn btn-primary m-1 mt-0 mb-0" onClick={e => this.setWeekMode(false)}>Месяц</button>
                    </div>
                    <div className="calend">
                        <div className="calendar-header d-flex">
                            <button className="btn btn-primary" onClick={() => { this.changeYear(-1) }}>←</button>
                            <div className="calendar-header-title">
                                {ye}
                            </div>
                            <button className="btn btn-primary" onClick={() => { this.changeYear(1) }}>→</button>
                        </div>
                        <div className="calendar-header d-flex">
                            <button className="btn btn-primary" onClick={() => { this.changeMonth(-1) }}>←</button>
                            <div className="calendar-header-title">
                                {mo}
                            </div>
                            <button className="btn btn-primary" onClick={() => { this.changeMonth(1) }}>→</button>
                        </div>
                        {weekMode ? <div className="calendar-header d-flex">
                            <button className="btn btn-primary" onClick={() => { this.changeWeek(-1) }}>←</button>
                            <div className="calendar-header-title">
                                {selectedWeek}
                            </div>
                            <button className="btn btn-primary" onClick={() => { this.changeWeek(1) }}>→</button>
                        </div> : ''}
                        <CalendarBody />
                        <div className="d-flex mt-1">
                            <div className="seekday mr-1"></div><h6 className="mr-1">Sick day</h6>
                            <div className="holiday mr-1"></div><h6 className="mr-1">Выходной</h6>
                            <div className="vacation mr-1"></div><h6 className="mr-1">Отпуск</h6>
                            <div className="short mr-1"></div><h6 className="mr-1">Сокращённый</h6>
                        </div>
                    </div>
                </div>
            </CalendarContext.Provider>
        )
    }

    changeMonth = (value: number) => {
        const { selectedMonth, selectedYear } = this.state;
        const { onChangeSelectedMonth } = this.props;
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
        if (newYear !== selectedYear) {
            this.changeYear(newYear - selectedYear);
        }
        if (onChangeSelectedMonth) {
            onChangeSelectedMonth(newMonth);
        }
        this.setState({
            selectedMonth: newMonth,
        })
    }

    changeWeek = (value: number) => {
        const { selectedMonth, selectedWeek} = this.state;
        const { onChangeSelectedWeek } = this.props;
        var newWeek = selectedWeek + value;
        var newMonth = selectedMonth + value;
        
        // if(newMonth!==selectedMonth){
        //     this.changeMonth(newMonth-selectedMonth);
        // }
        if (onChangeSelectedWeek) {
            onChangeSelectedWeek(newWeek);
        }
        this.setState({
            selectedWeek: newWeek,
        })
    }
    changeYear(value: number) {
        const { onChangeSelectedYear } = this.props;
        const { selectedYear } = this.state;
        console.log(value)
        if (onChangeSelectedYear) {
            onChangeSelectedYear(selectedYear + value);
        }
        this.setState({
            selectedYear: selectedYear + value,
        })
    }
    private setWeekMode(value: boolean) {
        this.setState({
            weekMode: value
        });
    }
}