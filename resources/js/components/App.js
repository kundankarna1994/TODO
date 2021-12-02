import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContext } from '../context/UsersContext';
import Todo from './Todo'
import TodoAdd from "./TodoAdd";
import TodoEdit from "./TodoEdit";
import Axios from 'axios';


const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await Axios.get("/api/users");
        setUsers(response.data.data);
    };
    return (
        <BrowserRouter>
            <UsersContext.Provider value={users}>
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/todo/create" element={<TodoAdd />} />
                    <Route path="/todo/edit/:id" element={<TodoEdit />} />
                </Routes>
            </UsersContext.Provider>
        </BrowserRouter>
    );
}

export default App
