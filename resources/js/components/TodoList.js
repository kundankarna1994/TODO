import React from 'react'
import { Link } from 'react-router-dom';

const TodoList = ({ results, handleEdit }) => {
    return (
        <ul className="list-group list-group-flush">
            {results &&
                results.map((result) => {
                    return (
                        <Link key={result.id} to={`todo/edit/${result.id}`}>
                            <li
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                className="list-group-item d-flex flex-column"
                            >
                                <span>{result.title}</span>
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
                        </Link>
                    );
                })}
        </ul>
    );
};

export default TodoList
