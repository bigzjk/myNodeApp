/*
* @Author: alkun
* @Date:   2019-04-15 23:29:37
* @Last Modified by:   alkun
* @Last Modified time: 2019-04-16 00:07:08
*/

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema
// students本地没有会自动创建
mongoose.connect('mongodb://localhost/students',{ useNewUrlParser: true })
let studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  gender: {
    type: String,
    enum: [0, 1],
    default: 0
  },
  hobbies: {
    type: String
  }
})


studentSchema.methods.add = function(name,callback){    
    Students.save({name:name}).exec(callback); // not checking logic
}

// Students会自动创建
var Students = module.exports = mongoose.model('Students', studentSchema)