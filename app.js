// 导入express
const express = require('express')
const app = express()
//导入body-parser
var bodyParser = require('body-parser')

//导入cors 跨域解决
const cors = require('cors')

// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require("multer");

// 全局挂载
app.use(cors())

// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({ dest:'./public/upload' })

app.use(upload.any())
// 静态托管
app.use(express.static("./public"));

// parse application/x-www-form-urlencoded
//当为false时值为字符串或数组；true时为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
	// status=0为成功,=1为失败,默认设为1,方便处理失败的情况
	res.cc = (err, status = 1) => {
		res.send({
			status,
			// 判断这个error是错误对象还是字符串
			message: err instanceof Error ? err.message : err,
		})
	}
	next()
})

const jwtconfig = require('./jwt_config/index.js')
const {
	expressjwt: jwt
} = require('express-jwt')

// 需要token的路径
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter = require('./router/login')
const Joi = require('joi')
app.use('/api', loginRouter)
const userRouter = require('./router/userinfo')
app.use('/user', userRouter)
const fileRouter = require('./router/file')
app.use('/file', fileRouter)
// 对不符合joi规则的情况进行报错
app.use((err,req, res, next) => {
	if (err instanceof Joi.ValidationError){
		res.send({
			status: 1,
			message:'输入的数据不符合验证规则'
		})
	}
})


// 绑定和侦听主机和端口
app.listen(3007, () => {
	console.log('http://192.168.0.173:3007')
})