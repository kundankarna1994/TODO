import React from 'react'

const TodoList = ({ results, handleEdit }) => {
    return (
        <ul className="list-group list-group-flush">
            {results &&
                results.map((result) => {
                    return (
                        <li
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            key={result.id}
                            className="list-group-item d-flex flex-column"
                            onClick={() => handleEdit(true,result.id)}
                        >
                            <span>{result.title}</span>
                            <div className="d-flex justify-content-between">
                                <span className="text-primary">
                                    {result.due_date}
                                </span>
                                <span>
                                    3 <i className="far fa-comments"></i>
                                </span>
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
};

export default TodoList
