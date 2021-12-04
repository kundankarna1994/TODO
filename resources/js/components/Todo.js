import React, { useEffect,useState,useContext } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import TodoList from './TodoList'
import { PusherContext } from '../context/PusherContext';
import TodoCompletedList from './TodoCompletedList';
import Notifications from './Notifications';


const Todo = () => {
    const channel = useContext(PusherContext);
    
    useEffect(() => {
        if(channel){
             channel.bind(`TodoCreated`, function (data) {
                 console.log('TodoCreated');
                 fetchData();
             });
             channel.bind(`TodoCompleted`, function (data) {
                 console.log("TodoCompleted");
                 fetchData();
             });
        }
       
        return () => {
            if(channel){
                channel.unbind("TodoCreated");
                channel.unbind("TodoCompleted");
            }
        };
    }, [channel]);
    
    const [results,setResults] = useState([]);
    
    useEffect(() => {
        fetchData();
    },[]);

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
                                <Link to="/todo/create">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <TodoList results={results} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <span>Completed</span>
                        </div>
                    </div>
                    <TodoCompletedList results={results} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <span>Notifications</span>
                        </div>
                    </div>
                    <Notifications />
                </div>
            </div>
        </div>
    );
}

export default Todo;