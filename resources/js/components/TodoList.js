import React from 'react'

const TodoList = ({results}) => {
    return (
        <ul className="list-group list-group-flush">
           {results && results.map((result) => {
               return (
                   <li key={result.id} className="list-group-item d-flex flex-column">
                       <span>{result.title}</span>
                       <div className="d-flex justify-content-between">
                           <span className="text-primary">{result.due_date}</span>
                           <span>
                               3 <i className="far fa-comments"></i>
                           </span>
                       </div>
                   </li>
               );
           })}
        </ul>
    );
}

export default TodoList
