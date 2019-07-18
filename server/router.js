/*
 * @Author: alkun
 * @Date:   2019-03-25 23:06:48
 * @Last Modified by:   alkun
 * @Last Modified time: 2019-04-15 23:44:10
 */

'use strict';
// const fs = require('fs')
const http = require('http')
const express = require('express')
// const Student = require('./student-fs')
const Student = require('./student')
const router = express.Router()
const axios = require('axios')

// let _fn
let apiHost = 'https://b.zhuishushenqi.com/v2/category/ranklist?node=8c31c6a912464c3e9de4cc6c2c8c402a&type=&packageName=&token='
// let apiHost = 'https://music.163.com/weapi/appcustomconfig/get'

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
    .get('/zhuishu', async (req, res, next) => {
        // axios.defaults.headers['Referer'] = 'Https://m.damai.cn/damai/home/index.html'
        let resp = await axios.get(apiHost)
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
