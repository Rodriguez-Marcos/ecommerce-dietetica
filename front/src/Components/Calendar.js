import React, { Fragment, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays, isWeekend } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);


export default function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [input, setInput] = useState({
    date: '',
    time: '',
  });
  function calcWeekends(startDate, endDate) {
    if (startDate > endDate) return false;
    var date  = startDate;
    var dates = [];

    while (date < endDate) {
        if (isWeekend(date)) dates.push(new Date(date));
        date.setDate( date.getDate() + 1 );
    }

    return dates;
}
const handleInputChange = function (e) {
  console.log(e.target.value)
  let value = e.target.value;
  value = value.toString();
  console.log(typeof value);

  setInput({
    ...input,
    time: value,
  });
};

let weekends = calcWeekends(new Date(),addDays(new Date(),14))
  return (
    <DatePicker
      onChange={console.log}
      withPortal
      portalId="root-portal"
      locale={es}
      dateFormat="dd/MM/yyyy HH:mm:aa"
      minDate={new Date()}
      excludeDates={weekends}
      minTime={new Date('Oct 22 2021 09:00:00')}
      maxTime={new Date('Oct 22 2021 18:00:00')}
      showTimeSelect
      maxDate={addDays(new Date(), 14)}
      selected={startDate} onChange={(date) => setStartDate(date)}
    />
  );
}