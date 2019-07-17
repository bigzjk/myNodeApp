import React from 'react'
import {withRouter} from 'react-router-dom' ;

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            haha: '搜索搜索搜索'
        }
    }
    render() {
        return <div>{this.state.haha}</div>
    }
}
export default withRouter(Search)