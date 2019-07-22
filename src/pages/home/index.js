import React from 'react'
import { Link } from "react-router-dom";
import { Button, Carousel } from 'antd-mobile';
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
            },
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3456/cms_list_tag?pageSize=10&nid=25066472&pageNo=0&type=2006').then((resp) => {
            let data = resp.data
            console.log('data', data)
            this.setState({
                data: data.result
            })

        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        const { data = {}, demoObj } = this.state
        let { results = [] } = data
        console.log(results)
        return (
            <div className="Home">
                {results.length > 0 ? <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {results.map(item => (
                        <a
                            className="banneritem"
                            key={item}
                            href={item.linkData.linkUrl}
                        >
                            <img
                                src={item.linkData.linkPicUrl}
                                alt=""
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                    
                </Carousel> : null}
                <Demo
                    text="这里是props: string数据"
                    demoObj={demoObj}
                />
                <Link to="/search">这里是路由跳转Link</Link>
                <div className="guangwang">
                    {/* <p>这里是antd-mobile组件库：<br />https://mobile.ant.design/components/nav-bar-cn/</p> */}
                    <Button
                        onClick={() => {
                            window.location.href = 'https://mobile.ant.design/components/nav-bar-cn/'
                        }}
                    >前往antd官网</Button>
                </div>
                {false && <ul className="banner">
                    {results.length > 0 && results.map((item) => (
                        <li className="banneritem" key={item.contentId}>
                            <img src={item.linkData.linkPicUrl} alt="" />
                            <div>{item.linkData.linkTitle}</div>
                        </li>
                    ))}
                </ul>}
                
            </div>
        )

    }
}