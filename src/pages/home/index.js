import React from 'react'
import { Link } from "react-router-dom";
const axios = require('axios')
import Demo from '../../components/Demo'
import './index.less'
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {},
            demoObj: {
                name: '这里是object数据',
                age: 19
            }
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3456/cms_list_tag?pageSize=10&nid=25066472&pageNo=0&type=2006').then((resp) =>{
            let data = resp.data
            console.log('data', data)
            this.setState({
                data: data.result
            })

        }).catch((e)=>{
            console.log(e)
        })
    }
    render() {
        const { data = {}, demoObj } = this.state
        let { results = [] } = data
        console.log(results)
        return(
            <div className="Home">
                <Demo 
                    text="这里是props: string数据"
                    demoObj={demoObj}
                />
                <ul className="banner">
                    {results.length > 0 && results.map((item)=>(
                        <li className="banneritem" key={item.contentId}>
                            <img src={item.linkData.linkPicUrl} alt=""/>
                            <div>{item.linkData.linkTitle}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )

    }
}