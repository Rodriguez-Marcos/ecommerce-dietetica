
import React, { useState } from "react";
import './Calendar.css'


// let today = new Date().toISOString().substr(0, 10);
// document.querySelector("#today").value = today;

// document.querySelector("#today2").valueAsDate = new Date();

export default function Calendar () {
  return (
    <input type="today" min="2017-08-15" max="2018-08-26" step="7"></input>

  )
}

   