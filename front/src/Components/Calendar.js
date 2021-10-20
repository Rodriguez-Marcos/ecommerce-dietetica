
import React, { useState } from "react";
import './Calendar.css'


// let today = new Date().toISOString().substr(0, 10);
// document.querySelector("#today").value = today;

// document.querySelector("#today2").valueAsDate = new Date();

export default function Calendar () {
  return (
    <div>
    <input id="today2" type="date"></input>
      <label for="appt">Por favor elija horario de retiro:</label>

  <input type="time" id="appt" name="appt"
       min="09:00" max="18:00" required></input>

  <small>Horarios: de 9am a 18hs</small>
    </div>


  )
}

   