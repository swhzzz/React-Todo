import React from 'react'
export default class LoginForm extends React.Component{
    render(){
        return (
            <form className="logIn" onSubmit={this.props.onSubmit}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.props.formData.username}
                           onChange={this.props.onChange.bind(null, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.props.formData.password}
                           onChange={this.props.onChange.bind(null, 'password')}/>
                </div>
                <div>
                    <button>登录</button>
                    <a href="#" onClick={this.props.forgetPassword}>忘记密码了,点我</a>
                </div>
            </form>
        )
    }
}
