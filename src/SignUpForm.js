import React from 'react'
export default function (props) {
    return (
        <form className="signUp" onSubmit={props.onSubmit}>
            <div className="row">
                <label>邮箱</label>
                <input type="text" value={props.formData.email}
                       onChange={props.onChange.bind(this, 'email')}/>
            </div>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={props.formData.username}
                       onChange={props.onChange.bind(this, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.formData.password}
                       onChange={props.onChange.bind(this, 'password')}/>
            </div>
            <div>
                <button>注册</button>
            </div>
        </form>
    )
}

