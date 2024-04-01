const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
// 导入node.js的crypto库生成uuid
const crypto = require('crypto')
// 导入fs处理文件
fs = require('fs')

// 上传头像
exports.uploadAvatar = (req, res) => {
	// 生成唯一标识
	const onlyId = crypto.randomUUID()
	let oldName = req.files[0].filename;
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	const sql = 'insert into image set ?'
	db.query(sql, {
		image_url: `http://192.168.0.173:3007/upload/${newName}`,
		onlyId
	}, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			onlyId,
			status: 0,
			url: 'http://192.168.0.173:3007/upload/' + newName
		})
	})
}


//绑定账号 涉及两张数据表
exports.bindAccount = (req,res)=>{
	const {
		account,
		onlyId,
		url
	} = req.body
	const sql = 'update image set account = ? where onlyId = ?'
	db.query(sql,[account,onlyId],(err,result)=>{
		if(err) return res.cc(err)
		if(result.affectedRows == 1){
			const sql1 = 'update users set image_url = ? where account = ?'
			db.query(sql1,[url, account],(err,result)=>{
				if(err) return res.cc(err)
				res.send({
					status: 0,
					message:'修改成功'
				})
			})
		}
	})
}

exports.getUserInfo = (req,res)=>{
	const sql = 'select * from users where id = ?'
	db.query(sql,req.body.id,(err,result)=>{
		if(err) return res.cc(err)
		result[0].password = ''
		res.send(result[0])
	})
}