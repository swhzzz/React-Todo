import React from 'react'
import './TodoInput.css'

class TodoInput extends React.Component{
    handleChange= (e)=>{
        this.props.changeValue(e.target.value)
    }

    handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            this.props.addTodo()
        }
    }

    render(){
        return (
            <div>
                <input type="text" className="todoInput" value={this.props.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            </div>
        )
    }
}


export default TodoInput;