import React from 'react'
import { Link } from "react-router-dom";
const axios = require('axios')

import './index.less'
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            haha: 'wodehahahah',
            pages: []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3000/zhuishu').then((resp) =>{
            console.log(resp)
            let data = resp.data
            this.setState({
                data,
                pages: data.pages
            })

        }).catch((e)=>{
            console.log(e)
        })
    }
    render() {
        const { data, pages } = this.state
        {}
        return <div className="Home">
            <div className="sub">sublimt</div>
            {this.state.haha}
            <Link to="./search"> go Search </Link>
            {pages.map((item)=>(
                <div key={item._id}>
                    <a href={item.url}>{item.title}</a>
                </div>
            ))}
        </div>
    }
}