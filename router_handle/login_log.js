const db = require('../db/index.js')

exports.loginLog = (req,res) =>{
	const {account,name,email} = req.body
	const login_time = new Date()
	const sql = 'insert into login_log set ?'
	db.query(sql,{account,name,email},(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'登录记录成功'
		})
	})
}

//返回登录日志列表
exports.loginLogList = (req,res) =>{
	const sql = 'select * from login_log'
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}

//返回登录日志列表的长度
exports.loginLogListLength = (req,res) =>{
	const sql = 'select * from login_log'
	db.query(sql,(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			length:result.length
		})
	})
}

//监听换页返回数据 登录日志列表
//limit 10 为我们拿到数据offset 我们跳过的多少的数据
// exports
