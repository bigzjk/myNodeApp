import React from 'react'
import { Link } from "react-router-dom";

import './index.less'
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            haha: 'wodehahahah'
        }
    }
    render() {
        return <div className="Home">
            <div className="sub">sublimt</div>
            {this.state.haha}
            <Link to="./search"> go Search </Link>
        </div>
    }
}