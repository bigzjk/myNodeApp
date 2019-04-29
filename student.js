// 对数据的增删改查操作
const fs = require('fs')
let dbPath = './db.json'

const Student = {
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
    change: (info, callback)=>{
        Student.find((err, data)=>{
            if(err) {
                callback(err)
            }
            for (var i = 0; i < data.length; i++) {
                if(info.id == data[i].id){
                    data[i]={
                        ...data[i],
                        ...info
                    }
                    break;
                }
            };
            let dbJson = {students: data}
            fs.writeFile(dbPath, JSON.stringify(dbJson), (err)=>{
                if(err){
                    callback(err)
                }
                callback(null)
            })
        })
    },
    delete: (id)=>{
        Student.find((err, data)=>{
            if(err) {
                callback(err)
            }
            for (var i = 0; i < data.length; i++) {
                if(id == data[i].id){
                    data.splice(i, 1)
                    break;
                }
            };
            let dbJson = {students: data}
            fs.writeFile(dbPath, JSON.stringify(dbJson), (err)=>{
                if(err){
                    callback(err)
                }
                callback(null)
            })
        })
        console.log('delete');
    },
}

module.exports = Student