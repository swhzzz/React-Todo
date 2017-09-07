import React from 'react'
import './toast.css'

export default function (props) {
    return (
        <div className="toast animation">{props.msg}</div>
    )
}
