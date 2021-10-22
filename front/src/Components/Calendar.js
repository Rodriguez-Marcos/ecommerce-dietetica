import React, { Fragment, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays, isWeekend } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);


export default function Calendar() {
  const [hoursSelected, setHoursSelected] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [err, setErr] = useState('No se ha seleccionado un horario valido');
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

let weekends = calcWeekends(new Date(),addDays(new Date(),14))
function handleChange(e){
 // console.log(weekends)
  let hour = e.slice(11,13);
  let minut = e.slice(14,16);
  let validHours = [9,10,11,12,13,14,15,16,17,18]
  let isValid = validHours.find(x=>x===Number(hour))
  if(isValid){
    if(minut === '30' || minut === '00'){
     setErr('')}
     else{setErr('No se ha seleccionado un horario valido')}
  }
  else{setErr('No se ha seleccionado un horario valido')}
  setHoursSelected(e)
}

  return (
    <>
    <DatePicker
      id='hola'
      withPortal
      portalId="root-portal"
      locale={es}
      dateFormat="dd/MM/yyyy HH:mm:aa"
      minDate={new Date()}
      excludeDates={weekends}
      minTime={new Date('Oct 22 2021 09:00:00')}
      maxTime={new Date('Oct 22 2021 18:00:00')}
      showTimeSelect
      onClickOutside={e=>handleChange(document.getElementById('hola').value)}
      onCalendarClose={e=>handleChange(document.getElementById('hola').value)}
      onCalendarOpen={e=>handleChange(document.getElementById('hola').value)}
      onChangeRaw={e=>handleChange(document.getElementById('hola').value)}
      maxDate={addDays(new Date(), 14)}
      selected={startDate} onChange={(date) => setStartDate(date)}
    />
    <h6 style={{color: 'red'}}>{err}</h6>
    </>
  );
}