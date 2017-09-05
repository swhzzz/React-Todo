import React from 'react'
import AV from './leanCloud'
import getErrorMsg from './getErrorMsg'
import './UserDialog.css'

export default class UserDialog extends React.Component {
    state = {
        selected: 'signUp',
        selectedTab: 'signUpOrLogIn',
        formData: {
            email: '',
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
        let {email, username, password} = this.state.formData;
        if (username === '' || password === '') {
            return;
        }
        let user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.signUp().then((loginedUser) => {
            console.log(loginedUser);
            this.props.onSignUpOrLogIn({
                id: loginedUser.id,
                ...loginedUser.attributes
            })
        }, (error) => {
            let errorMsg = getErrorMsg(error)
            console.log(errorMsg)
        })
    }

    logIn = e => {
        e.preventDefault();
        let {username, password} = this.state.formData
        AV.User.logIn(username, password).then((loginedUser) => {
            this.props.onSignUpOrLogIn({
                id: loginedUser.id,
                ...loginedUser.attributes
            })
        }, (error) => {
            let errorMsg = getErrorMsg(error)
            console.log(errorMsg)
        })
    }

    changeFormData(key, e) {
        // console.log(key,e)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        // console.log(e.target.value)
        this.setState(stateCopy)
    }

    forgetPassword = () => {
        this.setState({selectedTab: ''})
    }

    resetPassword = (e) => {
        e.preventDefault();
        let {email}= this.state. formData;
        if(/^\w+@\w+(\.com)$/i.test(email)){
            console.log('ok');
            AV.User.requestPasswordReset(email).then((xx)=>{
                console.log(xx)
            },(error)=>{console.log(error)})
        }
    }

    goBackToLogIn = ()=>{
        this.setState({selectedTab: 'signUpOrLogIn'})
    }

    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp}>
                <div className="row">
                    <label>邮箱</label>
                    <input type="text" value={this.state.formData.email}
                           onChange={this.changeFormData.bind(this, 'email')}/>
                </div>
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
                    <a href="#" onClick={this.forgetPassword}>忘记密码了,点我</a>
                </div>
            </form>
        )
        let forgetPassword = (
            <div className="forgetPassword-wrap">
                <h3>重置密码</h3>
                <form className="forgetPassword">
                    <div>
                    <label>邮箱</label>
                    <input type="email" value={this.state.formData.email}
                           onChange={this.changeFormData.bind(this, 'email')}/>
                    </div>
                    <button onClick={this.resetPassword}>发送邮件</button>
                    <a href="#" onClick={this.goBackToLogIn}>返回登录</a>
                </form>
            </div>
        )
        let signUpOrLogIn = (
            <div className="signUpOrLogIn">
                <div>
                    <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'}
                                  onChange={this.handleSwitch}/>注册</label>
                    <label><input type="radio" value="logIn" checked={this.state.selected === 'logIn'}
                                  onChange={this.handleSwitch}/>登录</label>
                </div>
                <div>
                    {this.state.selected === 'signUp' ? signUpForm : null}
                    {this.state.selected === 'logIn' ? logInForm : null}
                </div>
            </div>
        )
        return (
            <div className="UserDialog-wrap">
                {this.state.selectedTab === 'signUpOrLogIn' ? signUpOrLogIn : forgetPassword}
            </div>
        )
    }
}