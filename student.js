// 对数据的增删改查操作
const fs = require('fs')
let dbPath = './db.json'

module.exports = {
    find: (callback)=>{
        fs.readFile(dbPath, 'utf8', (err, data)=>{
            if(err){
                return callback(err)
            }
            callback(null, JSON.parse(data).students)
        })
    },
    save: (obj, callback)=>{
        fs.readFile(dbPath, 'utf8', (err, data)=>{
            if(err){
                return callback(err)
            }
            var students = JSON.parse(data).students
            obj.id = students[students.length-1].id + 1
            students.push(obj)
            var result = JSON.stringify({
                students
            })
            fs.writeFile(dbPath, result, (err)=>{
                if(err){
                    callback(err)
                }
                callback(null)
            })
        })
    },
    change: ()=>{
        console.log('change');
    },
    delete: ()=>{
        console.log('delete');
    },
}