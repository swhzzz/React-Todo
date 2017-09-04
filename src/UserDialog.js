import React from 'react'
import AV from './leanCloud'
import getErrorMsg from'./getErrorMsg'

export default class UserDialog extends React.Component {
    state = {
        selected: 'signUp',
        formData: {
            username: '',
            password: ''
        }
    }

    handleSwitch = e => {
        this.setState({
            selected: e.target.value
        })
    }

    signUp = (e) => {
        e.preventDefault();
        let {username, password} = this.state.formData;
        if (username === '' || password === '') {
            return;
        }
        let user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.signUp().then((loginedUser) => {
            console.log(loginedUser);
            this.props.onSignUpOrLogIn({
                id: loginedUser.id,
                ...loginedUser.attributes
            })
        }, (error) => {
            let errorMsg= getErrorMsg(error)
            console.log(errorMsg)
        })
    }

    logIn = e => {
        e.preventDefault();
        let {username,password}=this.state.formData
        AV.User.logIn(username,password).then((loginedUser)=>{
            this.props.onSignUpOrLogIn({
                id: loginedUser.id,
                ...loginedUser.attributes
            })
        },(error)=>{
            let errorMsg= getErrorMsg(error)
            console.log(errorMsg)
        })
    }

    changeFormData(key, e) {
        // console.log(key,e)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div>
                    <button>注册</button>
                </div>
            </form>
        )
        let logInForm = (
            <form className="logIn" onSubmit={this.logIn}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div>
                    <button>登录</button>
                </div>
            </form>
        )
        return (
            <div>
                <div>
                    <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.handleSwitch} />注册</label>
                    <label><input type="radio" value="logIn" checked={this.state.selected === 'logIn'} onChange={this.handleSwitch} />登录</label>
                </div>
                <div >
                    {this.state.selected === 'signUp' ? signUpForm : undefined}
                    {this.state.selected === 'logIn' ? logInForm : undefined}
                </div>
            </div>
        )
    }
}