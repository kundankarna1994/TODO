import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = ({value,handleChange}) => {
    return (
        <DatePicker className="form-control" selected={value} onChange={handleChange} />
    );
}

export default Date
