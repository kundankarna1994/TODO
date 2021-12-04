import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const TodoCompletedList = ({ results }) => {
   

    return (
        <ul className="list-group list-group-flush">
            {results &&
                results.map((result) => {
                    if (result.completed === 1) {
                        return (
                            <li
                                key={result.id}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                className="list-group-item d-flex flex-column"
                            >
                                <div className="d-flex justify-content-between">
                                    <Link to={`todo/edit/${result.slug}`}>
                                        <span>{result.title}</span>
                                    </Link>
                                    <span className="text-success">Completed</span>
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

export default TodoCompletedList;
