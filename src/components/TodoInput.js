import React from 'react'

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
                <input type="text" value={this.props.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            </div>
        )
    }
}


export default TodoInput;