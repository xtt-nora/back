// 导入express
const express = require('express')
const app = express()
//导入body-parser
var bodyParser = require('body-parser')

//导入cors
const cors = require('cors')
// 全局挂载
app.use(cors())

// parse application/x-www-form-urlencoded
//当为false时值为字符串或数组；true时为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 绑定和侦听主机和端口
app.listen(3007, () => {
	console.log(' http://192.168.1.101:3007')
})