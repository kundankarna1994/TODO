import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import TodoList from './TodoList'
import TodoForm from './TodoForm';
import TodoAdd from './TodoAdd';
import { UsersContext } from '../context/UsersContext';


const App = () => {
    const [results,setResults] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async() => {
         const response = await Axios.get("/api/users");
         setUsers(response.data.data);
    }
    const fetchData = async() => {
        const response = await Axios.get("/api/todo");
        setResults(response.data.data);
    }
    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <span>Todo</span>
                            <span>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                    <TodoList results={results} />
                </div>
            </div>

            <UsersContext.Provider value={users}>
                <TodoAdd />
            </UsersContext.Provider>
        </div>
    );
}

export default App;