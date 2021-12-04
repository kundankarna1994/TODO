import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContext } from '../context/UsersContext';
import { PusherContext } from "../context/PusherContext";
import { UserContext } from "../context/UserContext";
import Todo from './Todo'
import TodoAdd from "./TodoAdd";
import TodoEdit from "./TodoEdit";
import Axios from 'axios';
import Pusher from "pusher-js";


const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [channel,setChannel] = useState(null);
    useEffect(() => {
        intializePusher();
        fetchUsers();
    }, []);
    const intializePusher = async() => {
        const response = await Axios.get('/api/user');
        const token = `Bearer ${response.data.token}`;
        const headers = {
            Authorization: token,
        };
        console.log(process.env.MIX_PUSHER_APP_KEY);
        const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            authEndpoint: "/broadcasting/auth",
            auth: {
                headers: headers,
            },
        });
        setUser(response.data.user);
        setChannel(pusher.subscribe("private-todo"));
    }
    
    console.log(channel);
    
    const fetchUsers = async () => {
        const response = await Axios.get("/api/users");
        setUsers(response.data.data);
    };
    
    return (
        <BrowserRouter>
            <PusherContext.Provider value={channel}>
                <UsersContext.Provider value={users}>
                    <UserContext.Provider value={user}>
                        <Routes>
                            <Route path="/" element={<Todo />} />
                            <Route path="/todo/create" element={<TodoAdd />} />
                            <Route path="/todo/edit/:slug" element={<TodoEdit />} />
                        </Routes>
                    </UserContext.Provider>
                </UsersContext.Provider>
            </PusherContext.Provider>
        </BrowserRouter>
    );
}

export default App
