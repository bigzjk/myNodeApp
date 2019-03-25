
/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// app.use('/public/', express.static('./public/'))
// app.use('/asset/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))
// app.set('views', 'src')
let arr = [
  {
    name: '张三',
    info: '我是最帅的最帅的子帅的'
  }
]


app
  .get('/', (req,res)=>{
    fs.readFile('./db.json', (err, data)=>{
      if(err){
        return res.status(500).send('Server error.')
      }
      var students = JSON.parse(data).students
      res.render('index.html',{
        students
      })
    })
  })
  .get('/student',(req,res)=>{
    res.render('new.html')
  })
  .get('/student',(req,res)=>{
    // res.render('post.html')
    // arr.unshift(req.body)
    console.log(req.body);
    // res.render('post.html')
    res.redirect('/')
  })
  .get('/post',(req,res)=>{
    res.render('post.html')
  })
  .post('/post',(req,res)=>{
    console.log(req.body);
    arr.unshift(req.body)
    // res.render('post.html')
    res.redirect('list')

  })
  .get('/list',(req,res)=>{
    res.render('list.html',{
      list: arr
    })
  })

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}!`)
})

