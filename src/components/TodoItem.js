import React from 'react'

class TodoItem extends React.Component{
    render(){
        return (
            <div>
                <input type="checkbox"/>
                <span>{this.props.content}</span>
                <button>x</button>
            </div>
        )
    }
}

export default TodoItem;