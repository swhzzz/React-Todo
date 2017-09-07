import React, {Component} from 'react';
import './reset.css'
import 'normalize.css'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from "./UserDialog";
import {getCurrentUser, logOut, TodoModel} from './leanCloud'
import BgBubbles from './BgBubbles'
import BackGround from './BackGround'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todoList: [],
            checked: 'signUp',
            user: getCurrentUser() || {}
        }
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
            })
        }
    }

    changeInputValue = (inputValue) => {
        this.setState({inputValue: inputValue})
    }

    addTodo = () => {
        let newTodo = {
            content: this.state.inputValue,
            isDone: false
        }
        TodoModel.create(newTodo, (id) => {
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                inputValue: '',
                todoList: this.state.todoList
            })
        }, (error) => {
            console.log(error)
        })
    }

    handleToggle = (todo) => {
        todo.isDone = !todo.isDone;
        TodoModel.update(todo);
        this.setState(this.state)
    }

    deleteTodo = (todo) => {
        TodoModel.destroy(todo.id)
        this.state.todoList.forEach((item, index) => {
            if (item.id === todo.id) {//id相同删除
                return this.state.todoList.splice(index, 1)
            }
        });
        this.setState({
            todoList: this.state.todoList
        })
    }

    onSignUpOrLogIn = (user) => {//注册或者登陆成功后，更新state，显示待办页
        this.setState({user})
    }

    logOut() {
        logOut()
        this.setState({
            user: {}
        })
    }

    render() {
        let todos = this.state.todoList.map((item, index) => {
            return <TodoItem key={index} todo={item} handleToggle={this.handleToggle}
                             deleteTodo={this.deleteTodo}/>
        });
        let mainPart = <div className="App">
            <h1>{this.state.user.username || '我'}的待办</h1>
            {this.state.user.id ? <button className="logOutBtn" onClick={this.logOut.bind(this)}><i className="iconfont icon-logout"></i></button> : null}
            <TodoInput value={this.state.inputValue} changeValue={this.changeInputValue} addTodo={this.addTodo}/>
            <ol className="todolist">{todos}</ol>
        </div>;
        return (
            <div className="App-wrap">
                <BackGround/>
                <BgBubbles/>
                {this.state.user.id ? mainPart : null}
                {this.state.user.id ? null : <UserDialog onSignUpOrLogIn={this.onSignUpOrLogIn}/>}
            </div>
        )
    }
}

export default App;
