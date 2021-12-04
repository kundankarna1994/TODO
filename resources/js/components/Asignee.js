import React,{useContext,useEffect,useState} from 'react'
import Select from "react-select";
import { UsersContext } from '../context/UsersContext';

const Asignee = ({value,label,handleChange}) => {
    const users = useContext(UsersContext);
    const [options, setOptions] = useState([]);
   
    useEffect(() => {
        if(users){
            setData();
        }
    }, [users]);
    
    const setData = () => {
        const data = users.map((user) => {
            return { value: user.id, label: user.name };
        });
        data.unshift({ value: "", label: "Select a user" });
        setOptions(data);
    }
    
    return (
        <Select
            defaultValue={{ label:label,value:value }}
            name="asignee"
            options={options}
            getValue={(e) => console.log(e)}
            onChange={handleChange}
        />
    );
}

export default Asignee
