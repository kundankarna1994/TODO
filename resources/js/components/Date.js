import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const CustomDate = ({value,handleChange}) => {
    let date = new Date();
    if(value){
       date = new Date(value); 
    }
    return (
        <DatePicker
            className="form-control"
            selected={date}
            onChange={handleChange}
        />
    );
}

export default CustomDate;
