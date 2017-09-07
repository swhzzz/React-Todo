import React from 'react'
export default class ForgetPassword extends React.Component{
    render(){
        return (
            <div className="forgetPassword-wrap">
                <h3>重置密码</h3>
                <form className="forgetPassword">
                    <div className="row">
                        <label><i className="iconfont icon-email"></i></label>
                        <input type="email" value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null, 'email')} spellCheck="false"/>
                    </div>
                    <button onClick={this.props.resetPassword}>发送邮件</button>
                    <a href="#" className="goBackLogInBtn" onClick={this.props.goBackToLogIn}>返回登录</a>
                </form>
            </div>
        )
    }
}