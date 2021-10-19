
import React, { useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);


export default function Calendar () {

   
    const [startDate, setStartDate] = useState(new Date())
    
      const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      };

      const filterDate = (date) => {
        const currentDate = new Date();
        const selectedDate = new Date(date);
    
        return currentDate.getTime() < selectedDate.getTime();
      };
//        const isWeekday = (date) => {
//     const day = getDay(date);
//     return day !== 0 && day !== 6;
//   };
const handleOnBlur = ({ target: { value } }) => {
    const date = new Date(value);
    if (date.isValid) {
      console.log("date: %s", date.format( "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
  };

      return (
        <DatePicker
        //  placeholderText="Seleccione fecha y horario disponible"
          selected={startDate}
          locale= "es"
          className="pickers"
        //   dateFormat="dd-MM-yyyy"
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          filterTime={filterPassedTime}
          filterDate={filterDate}
          withPortal
          portalId="root-portal"
          onBlur={handleOnBlur}
          dateFormat="d MMMM, h: mm aa"

        //   dateFormat="MMMM d, yyyy h:mm aa"
        />
      
      );
    };















// //  const [startDate, setStartDate] = useState(new Date());
//  const [startDate, setStartDate] = useState(null);
//  const [maxDate, setMaxDate] = useState(new Date("2021", "9", "28") )
//  const [minDate, setMinDate] = useState(new Date("2021", "9", "18") )
//   const [maxHora, setMaxHora] = useState(new Date(), 5)
//  const [minHora, setMinHora] = useState(new Date(), 1)

 
//  const isWeekday = (date) => {
//     const day = getDay(date);
//     return day !== 0 && day !== 6;
//   };




// //  const [startMin, setStartMin] = useState(
// //     setHours(setMinutes(new Date(), 30), 16)
// //   );

// //  let handleColor = (time) => {
// //     return time.getHours() > 12 ? "text-success" : "text-error";
// //   };
  

//     return (
//         <div className="contenedor">
//             <div className="center">
//             {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
//             <DatePicker
//             showTimeSelect
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             minDate={minDate}
//             maxDate={maxDate}
//             filterDate={isWeekday}
//             showDisabledMonthNavigation
//             // timeClassName={handleColor}
//             minTime={minHora}
//             maxTime={maxHora}
//             />
   
//            </div>
//         </div>
//     )
// }

// exclude dates
// () => {
//     const [startDate, setStartDate] = useState(new Date());
//     return (
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         excludeDates={[new Date(), subDays(new Date(), 1)]}
//         placeholderText="Select a date other than today or yesterday"
//       />
//     );
//   };