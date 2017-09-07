import React from 'react'
import './TodoInput.css'

class TodoInput extends React.Component {
    handleChange(e) {
        this.props.changeValue(e.target.value)
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                this.props.addTodo()
            }
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="todoInput" value={this.props.value}
                       onChange={this.handleChange.bind(this)}
                       onKeyPress={this.handleKeyPress.bind(this)} spellCheck="false"/>
            </div>
        )
    }
}


export default TodoInput;