import React, {Component} from 'react';
import './reset.css'
import 'normalize.css'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
// import localStore from './localStore'
import UserDialog from "./UserDialog";
import AV from './leanCloud'

let i = 0;

class App extends Component {
    state = {
        inputValue: '',
        // todoList: localStore.load('data') || []
        todoList: [],
        checked: 'signUp',
        user: this.getCurrentUser() || {}
    }

    getCurrentUser() {
        let user = AV.User.current()
        // console.log(user)
        if (user) {
            return {
                id: user.id,
                ...user.attributes
            }
        } else {
            return null
        }
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
        });
        this.setState({
            todoList: this.state.todoList
        })
    }

    onSignUpOrLogIn = (user) => {
        this.setState({user})
    }

    // onLogIn = (user)=>{
    //     this.setState({user})
    // }

    logOut = () => {
        this.setState({user: {}});
        AV.User.logOut()
    }
    // componentDidUpdate(){
    //     localStore.save('data',this.state.todoList)
    // }

    render() {
        let todos = this.state.todoList.map((item, index) => {
            return <TodoItem key={index} todo={item} handleToggle={this.handleToggle}
                             handleDelete={this.handleDelete}/>
        });
        let mainPart = <div className="App">
            <h1>{this.state.user.username || '我'}的待办</h1>
            {this.state.user.id ? <button onClick={this.logOut}>登出</button> : null}
            <TodoInput value={this.state.inputValue} changeValue={this.changeInputValue} addTodo={this.addTodo}/>
            <ol className="todolist">{todos}</ol>
        </div>;
        return (
            <div className="App-wrap">
                {this.state.user.id ? mainPart : null}
                {this.state.user.id ? null : <UserDialog onSignUpOrLogIn={this.onSignUpOrLogIn}/>}
            </div>
        )
    }
}

export default App;
