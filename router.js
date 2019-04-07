/*
 * @Author: alkun
 * @Date:   2019-03-25 23:06:48
 * @Last Modified by:   alkun
 * @Last Modified time: 2019-04-07 21:41:03
 */

'use strict';
const fs = require('fs')
const express = require('express')
const Student = require('./student')
const router = express.Router()
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
