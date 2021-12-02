import React,{useContext,useEffect,useState} from 'react'
import Select from "react-select";
import { UsersContext } from '../context/UsersContext';

const Asignee = ({value,handleChange}) => {
    const users = useContext(UsersContext);

    useEffect(() => {

        const data = users.map((user) => {
            return { value: user.id,label:user.name}
        });
        data.unshift({ value: "", label: "Select a user" });
        setOptions(data);
    }, [users]);
    const [options,setOptions] = useState([]);

    return (
        <Select name="asignee" options={options} getValue={(e) => console.log(e)} onChange={handleChange}/>
    )
}

export default Asignee
