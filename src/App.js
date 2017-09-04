import React, {Component} from 'react';
import './reset.css'
import 'normalize.css'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

let i = 0;

class App extends Component {
    state = {
        inputValue: '',
        todoList: []
    }

    changeInputValue = (inputValue) => {
        this.setState({inputValue: inputValue})
    }

    addTodo = () => {
        this.state.todoList.push({
            id: i++,
            content: this.state.inputValue,
            isDone: false
        })
        this.setState({
            inputValue: '',
            todoList: this.state.todoList
        })
    }

    handleToggle = (todo) => {
        todo.isDone = !todo.isDone;
        this.setState(this.state)
    }

    handleDelete = (id) => {
        this.state.todoList.forEach((item, index) => {
            if (item.id === id) {
                return this.state.todoList.splice(index, 1)
            }
        })
        this.setState({
            todoList: this.state.todoList
        })
    }

    render() {
        let todos = this.state.todoList
            .map((item, index) => {
                return <TodoItem key={index} todo={item} handleToggle={this.handleToggle}
                                 handleDelete={this.handleDelete}/>
            })
        return (
            <div className="App">
                <h1>我的待办</h1>
                <TodoInput value={this.state.inputValue} changeValue={this.changeInputValue} addTodo={this.addTodo}/>
                <ol className="todolist">{todos}</ol>
            </div>
        )
    }
}

export default App;
