import React, { Component } from 'react'

export default class Demo extends Component {

    render() {
        const { text, demoObj } = this.props
        return (
            <div>
                这里是组件
                <p>{text}</p>
                <p>{demoObj.name}已经{demoObj.age}岁了</p>
            </div>
        )
    }
}
