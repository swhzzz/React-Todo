import React from 'react'
import AV from './leanCloud'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import ForgetPassword from './ForgetPassword'
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

    signUp(e) {
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

    logIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        AV.User.logIn(username, password).then((loginedUser) => {
            this.props.onSignUpOrLogIn({
                id: loginedUser.id,
                ...loginedUser.attributes
            })
        }, (error) => {
            let errorMsg = getErrorMsg(error);
            console.log(errorMsg)
        })
    }

    changeFormData(key, e) {
        // console.log(key,e)
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData[key] = e.target.value;
        // console.log(e.target.value)
        this.setState(stateCopy)
    }

    forgetPassword() {
        this.setState({selectedTab: ''})
    }

    resetPassword(e) {
        e.preventDefault();
        let {email} = this.state.formData;
        if (/^\w+@\w+(\.com)$/i.test(email)) {
            console.log('ok');
            AV.User.requestPasswordReset(email).then((xx) => {
                console.log(xx)
            }, (error) => {
                console.log(error)
            })
        }
    }

    goBackToLogIn() {
        this.setState({selectedTab: 'signUpOrLogIn'})
    }

    render() {
        let forgetPassword = (
            <ForgetPassword formData={this.state.formData} onChange={this.changeFormData.bind(this)}
                            resetPassword={this.resetPassword.bind(this)}
                            goBackToLogIn={this.goBackToLogIn.bind(this)}/>
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
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.state.formData} onSubmit={this.signUp.bind(this)}
                                    onChange={this.changeFormData.bind(this)}/> : null}
                    {this.state.selected === 'logIn' ?
                        <LoginForm formData={this.state.formData} onSubmit={this.logIn.bind(this)}
                                   onChange={this.changeFormData.bind(this)}
                                   forgetPassword={this.forgetPassword.bind(this)}/> : null}
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