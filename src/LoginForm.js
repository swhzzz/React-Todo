import React from 'react'

export default function (props) {
    return (
        <div>
            <h3>登陆 <a href="#" className="noAccountBtn" onClick={props.switch.bind(this)}>还没有账号，注册</a>
            </h3>
            <form className="logIn" onSubmit={props.onSubmit}>
                <div className="row">
                    <label><i className="iconfont icon-username"></i></label>
                    <input type="text" value={props.formData.username}
                           onChange={props.onChange.bind(null, 'username')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" value={props.formData.password}
                           onChange={props.onChange.bind(null, 'password')}/>
                </div>
                <div>
                    <button>登录</button>
                    <a href="#" className="forgetPasswordBtn" onClick={props.forgetPassword}>忘记密码了,点我</a>
                </div>
            </form>
        </div>
    )
}
