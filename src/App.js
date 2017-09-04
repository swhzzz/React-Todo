import React, {Component} from 'react';
import 'normalize.css'
import './App.css';
import './reset.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

let i=0;
class App extends Component {
    state={
        inputValue: '',
        todoList: []
    }

    changeInputValue = (inputValue)=>{
        this.setState({inputValue:inputValue})
    }

    addTodo = ()=>{
        this.state.todoList.push({
            id: i++,
            content: this.state.inputValue
        })
        this.setState({
            inputValue: '',
            todoList: this.state.todoList
        })
    }

    render(){
        let todos = this.state.todoList.map((item,index)=>{
            return <TodoItem key={index} content={item.content} />
        })
        return(
            <div className="App">
                <h1>我的待办</h1>
                <TodoInput value={this.state.inputValue} changeValue={this.changeInputValue} addTodo={this.addTodo} />
                <ol>{todos}</ol>
            </div>
        )
    }
}

export default App;
