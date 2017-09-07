import React from 'react'
import {signUp, logIn, resetPassword} from './leanCloud'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import getErrorMsg from './getErrorMsg'
import ForgetPassword from './ForgetPassword'
import './UserDialog.css'
import './iconfont/iconfont.css'
import Toast from "./Toast";

export default class UserDialog extends React.Component {
    state = {
        selected: 'signUp',
        selectedTab: 'signUpOrLogIn',
        formData: {
            email: '',
            username: '',
            password: ''
        },
        msg: ''
    }

    handleSwitch() {
        if (this.state.selected === 'signUp') {
            this.setState({selected: 'logIn'})
        } else {
            this.setState({selected: 'signUp'})
        }
    }

    signUp(e) {
        e.preventDefault();
        let {email, username, password} = this.state.formData;
        if (email === '' ) {
            this.setState({msg: '邮箱不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return;
        }else if(username === ''){
            this.setState({msg: '用户名不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return;
        }else if(password === '') {
            this.setState({msg: '密码不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return ;
        }
        let success = (user) => {
            console.log(user);
            this.props.onSignUpOrLogIn(user)
        }
        let error = (error) => {
            let errorMsg = getErrorMsg(error)
            this.setState({msg: errorMsg})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
        };
        signUp(email, username, password, success, error)
    }

    logIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        if(username === ''){
            this.setState({msg: '用户名不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return;
        }else if(password === '') {
            this.setState({msg: '密码不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return ;
        }
        let success = (user) => {
            this.props.onSignUpOrLogIn(user)
        }
        let error = (error) => {
            let errorMsg = getErrorMsg(error)
            this.setState({msg: errorMsg})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
        };
        logIn(username, password, success, error)
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
        if(email === ''){
            this.setState({msg: '邮箱不能为空'})
            setTimeout(() => {
                this.setState({msg: ''})
            }, 2800)
            return ;
        }
        if (/^\w+@\w+(\.com)$/i.test(email)) {
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
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.state.formData} onSubmit={this.signUp.bind(this)}
                                    onChange={this.changeFormData.bind(this)}
                                    switch={this.handleSwitch.bind(this)}/> : null}
                    {this.state.selected === 'logIn' ?
                        <LoginForm formData={this.state.formData} onSubmit={this.logIn.bind(this)}
                                   onChange={this.changeFormData.bind(this)}
                                   forgetPassword={this.forgetPassword.bind(this)}
                                   switch={this.handleSwitch.bind(this)}/> : null}
                </div>
            </div>
        )
        return (
            <div className="UserDialog-wrap">
                {this.state.selectedTab === 'signUpOrLogIn' ? signUpOrLogIn : forgetPassword}

                {this.state.msg ? <Toast msg={this.state.msg}/> : null}
            </div>
        )
    }
}