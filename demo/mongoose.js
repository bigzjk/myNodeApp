/*
* @Author: alkun
* @Date:   2019-04-08 21:54:56
* @Last Modified by:   alkun
* @Last Modified time: 2019-04-09 22:07:09
*/

'use strict';
const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test')

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

var User = mongoose.model('User', userSchema)
var admin = new User({
  username: 'admin', 
  password: 'admin',
  email: 'admin@admin.com'
})
admin.save((err, data)=>{
  if(err){
    console.log('失败')
  }else{
    console.log('成功')
    console.log(data);
  }
})