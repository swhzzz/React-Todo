import React from 'react'
export default function (props) {
    return (
        <form className="logIn" onSubmit={props.onSubmit}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={props.formData.username}
                       onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.formData.password}
                       onChange={props.onChange.bind(null, 'password')}/>
            </div>
            <div>
                <button>登录</button>
                <a href="#" onClick={props.forgetPassword}>忘记密码了,点我</a>
            </div>
        </form>
    )
}
