/*
 * @Author: alkun
 * @Date:   2019-03-25 23:06:48
 * @Last Modified by:   alkun
 * @Last Modified time: 2019-04-15 23:44:10
 */

'use strict';
// const path = require('path')
// const http = require('http')
const express = require('express')
// const Student = require('./student-fs')
const Student = require('./student')
const router = express.Router()
const axios = require('axios')
const request = require('./utils/request')

let apiHost = 'http://m.music.migu.cn/migu/remoting/cms_list_tag?pageSize=10&nid=23831003&pageNo=0&type=2006'

router
    .get('/', (req, res) => {
        Student.find((err,data)=>{
            if(err){
                return res.status(500).send('Server error.')
            }
            res.render('index.html', {
                students: data
            })
        })
    })
    .get('/cms_list_tag', async (req, res, next) => {
        // console.log(req.query)
        // 分类页
        res.set('Access-Control-Allow-Origin', '*')
        // axios.defaults.headers['Origin'] =  '*'
        let resp = await request({
            type: 'get',
            url: '/cms_list_tag',
            data: req.query
        })
        res.send(resp.data)
       
    })
    // /category/fuzzy-search?&limit=50&alias=ns_xuanhuan&packageName=com.ifmoc.ZhuiShuShenQi&sort=1&start=0
    .get('/category/fuzzy-search', async (req, res, next) => {
        // 分类页
        res.set('Access-Control-Allow-Origin', '*')
        // axios.defaults.headers['Origin'] =  '*'
        
        // let resp = await axios.post(apiHost,{
        //     data: '{"cityId":872,"longitude":121.47,"latitude":31.23,"pageIndex":1,"pageSize":"16","utdidh5":"","userId":null,"loginKeyH5":"","cna":"LNhFFZXd0iwCAXTpWqZK59/z","recType":1,"option":2,"projectIdList":"[177450,596848165372,597423628490,598006634275,590672276119,175066,598034512523,598410993723,597419209377,175056,588766299013,590032608300,597844585765,589887083080,598917982143,598717233087]"}'
        // })
        let resp = await request({
            type: 'get',
            url: '/category/fuzzy-search?limit=50&alias=ns_xuanhuan&packageName=com.ifmoc.ZhuiShuShenQi&sort=1&start=0'
        })
        res.send(resp.data)
       
    })
    //转发 post 请求
    // .post('/', function(req, res, next){
    //     var path = req.originalUrl;
    //     var content = req.body;
    //     _fn.postData(path, content, function(data){
    //         res.send(data);
    //     })
    // })
    .get('/students/add', (req, res) => {
        res.render('new.html')
    })
    .post('/students/add', (req, res) => {
        Student.save(req.body,(err)=>{
            if(err){
                return res.status(500).send('Server error.')
            }
            res.redirect('/')
        })
    })
    .get('/students/edit', (req, res) => {
        let itemId = req.query.id
        Student.find((err,data)=>{
            if(err){
                return res.status(500).send('Server error.')
            }
            let itemInfo = data.find((item,i)=>item.id == itemId)
            res.render('edit.html', {
                student: itemInfo
            })
        })
    })
    .post('/students/edit', (req, res) => {
        Student.change(req.body, ()=>{
            res.redirect('/')
        });
    })
module.exports = router
