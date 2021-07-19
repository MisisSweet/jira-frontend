import moment from "moment";
import React from "react";
import { Year } from "../../services/models/Calendar/year";

const momentDate = moment(new Date());

const defaultContextValue = {
    years: Array<Year>(),
    weekMode: true,
    selectedYear: Number(momentDate.format('YYYY')),
    selectedMonth: Number(momentDate.format('M')) - 1,
    selectedWeek: Number(momentDate.format('W')),
    selectedDate: new Date()
};
export const CalendarContext = React.createContext(defaultContextValue);