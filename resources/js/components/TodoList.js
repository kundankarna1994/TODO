import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const TodoList = ({ results }) => {

    const [data,setData] = useState({
        completed:1
    })

    const markComplete = async (id) => {
       await Axios.post('/api/todo/' + id + '/completed',data);
    }

    return (
        <ul className="list-group list-group-flush">
            {results &&
                results.map((result) => {
                    if(result.completed === 0){
                        return (
                            <li
                                key={result.id}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                className="list-group-item d-flex flex-column"
                            >
                                <div className="d-flex justify-content-between">
                                    <Link to={`todo/edit/${result.id}`}>
                                        <span>{result.title}</span>
                                    </Link>
                                    <button
                                        onClick={() => markComplete(result.id)}
                                        className="btn text-success"
                                    >
                                        <i className="fa fa-check"></i>
                                    </button>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span className="text-primary">
                                        {result.readable_due_date}
                                    </span>
                                    <span>
                                        {result.total_comments}{" "}
                                        <i className="far fa-comments"></i>
                                    </span>
                                </div>
                            </li>
                        );
                    }
                })}
        </ul>
    );
};

export default TodoList
