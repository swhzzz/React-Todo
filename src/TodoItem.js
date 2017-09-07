import React from 'react'
import './TodoItem.css'

export default function (props) {
    return (
        <li className={"todo todoFadeIn"}>
            <i className={"iconfont "+(props.todo.isDone?"icon-check-box-outline":"icon-check-box-outline-bl")} onClick={props.handleToggle.bind(this, props.todo)}></i>
            <span
                className={"content " + (props.todo.isDone ? "line-through" : '')}>{props.todo.content}</span>
            <i className="iconfont icon-garbage delete" onClick={props.deleteTodo.bind(this, props.todo)}></i>
        </li>
    )
}

