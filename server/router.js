/*
 * @Author: alkun
 * @Date:   2019-03-25 23:06:48
 * @Last Modified by:   alkun
 * @Last Modified time: 2019-04-15 23:44:10
 */

'use strict';
// const fs = require('fs')
// const http = require('http')
const express = require('express')
// const Student = require('./student-fs')
const Student = require('./student')
const router = express.Router()
// const axios = require('axios')
const request = require('./utils/request')

// let _fn
// let apiHost = 'https://b.zhuishushenqi.com/v2/category/ranklist?node=8c31c6a912464c3e9de4cc6c2c8c402a&type=&packageName=&token='
// let apiHost = 'https://api.zhuishushenqi.com/recommendPage/pages?version=3'
// let apiHost = 'https://mtop.damai.cn/h5/mtop.damai.wireless.search.projectlist.byrecommend.get/1.0/?jsv=2.4.8&appKey=12574478&t=1563421812324&sign=f9e17321b891aa61f25b94b1afe2850e&api=mtop.damai.wireless.search.projectlist.byrecommend.get&v=1.0&dataType=json&H5Request=true&AntiCreep=true&AntiFlood=true&type=originaljson'

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
        
        res.set('Access-Control-Allow-Origin', '*')
        // axios.defaults.headers['Origin'] =  '*'
        
        // let resp = await axios.post(apiHost,{
        //     data: '{"cityId":872,"longitude":121.47,"latitude":31.23,"pageIndex":1,"pageSize":"16","utdidh5":"","userId":null,"loginKeyH5":"","cna":"LNhFFZXd0iwCAXTpWqZK59/z","recType":1,"option":2,"projectIdList":"[177450,596848165372,597423628490,598006634275,590672276119,175066,598034512523,598410993723,597419209377,175056,588766299013,590032608300,597844585765,589887083080,598917982143,598717233087]"}'
        // })
        let resp = await request({
            type: 'get',
            url: 'recommendPage/pages?version=3'
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
