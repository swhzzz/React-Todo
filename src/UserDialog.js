import React from 'react'
import {signUp,logIn,resetPassword} from './leanCloud'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import getErrorMsg from './getErrorMsg'
import ForgetPassword from './ForgetPassword'
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
        if (email === '' || username === '' || password === '') {
            return;
        }
        let success = (user)=> {
            console.log(user);
            this.props.onSignUpOrLogIn(user)
        }
        let error = (error)=>{
            let errorMsg = getErrorMsg(error)
            console.log(errorMsg)
        }
        signUp(email,username,password,success,error)
    }

    logIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user)=>{
            this.props.onSignUpOrLogIn(user)
        }
        let error = (error)=>{
            let errorMsg = getErrorMsg(error)
            console.log(errorMsg)
        };
        logIn(username,password,success,error)
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData[key] = e.target.value;
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
            resetPassword(email)
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