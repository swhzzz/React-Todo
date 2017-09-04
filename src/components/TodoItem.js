import React from 'react'
import '../TodoItem.css'

class TodoItem extends React.Component {
    returnDeleteId = () => {
        this.props.handleDelete(this.props.todo.id)
    }

    toggle = ()=>{
        this.props.handleToggle(this.props.todo)
    }

    render() {
        return (
            <li className="todo">
                <input type="checkbox" checked={this.props.todo.isDone} onChange={this.toggle}/>
                <span className={"content "+(this.props.todo.isDone?"line-through":'')}>{this.props.todo.content}</span>
                <button className="delete" onClick={this.returnDeleteId}>x</button>
            </li>
        )
    }
}

export default TodoItem;