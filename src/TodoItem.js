import React from 'react'
import './TodoItem.css'

export default function (props) {
    return (
        <li className="todo">
            <input type="checkbox" checked={props.todo.isDone}
                   onChange={props.handleToggle.bind(this, props.todo)}/>
            <span
                className={"content " + (props.todo.isDone ? "line-through" : '')}>{props.todo.content}</span>
            <button className="delete" onClick={props.deleteTodo.bind(this, props.todo)}>x</button>
        </li>
    )
}

