import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContext } from '../context/UsersContext';
import { PusherContext } from "../context/PusherContext";
import Todo from './Todo'
import TodoAdd from "./TodoAdd";
import TodoEdit from "./TodoEdit";
import Axios from 'axios';
import Pusher from "pusher-js";


const App = () => {
    const [users, setUsers] = useState([]);
    const [channel,setChannel] = useState(null);
    useEffect(() => {
        fetchUsers();
        intializePusher();
        
    }, []);

    const intializePusher = async() => {
        const response = await Axios.get('/api/user/token');
        const token = `Bearer ${response.data}`;
        const headers = {
            Authorization: token,
        };
        const pusher = new Pusher("b11c4966c31edb43c445", {
            cluster: "ap2",
            authEndpoint: "/broadcasting/auth",
            auth: {
                headers: headers,
            },
        });
        setChannel(pusher.subscribe("private-todo"));
    }
    
    
    
    const fetchUsers = async () => {
        const response = await Axios.get("/api/users");
        setUsers(response.data.data);
    };
    
    return (
        <BrowserRouter>
            <PusherContext.Provider value={channel}>
                <UsersContext.Provider value={users}>
                    <Routes>
                        <Route path="/" element={<Todo />} />
                        <Route path="/todo/create" element={<TodoAdd />} />
                        <Route path="/todo/edit/:id" element={<TodoEdit />} />
                    </Routes>
                </UsersContext.Provider>
            </PusherContext.Provider>
        </BrowserRouter>
    );
}

export default App
