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

//忘记密码：确认账户；  验证账户和与邮箱是否一致 email account
exports.verifyaAccount = (req,res)=>{
	const {
		account,
		email
	} = req.body
	const sql = 'select email from users where account = ?'
	db.query(sql,account ,(err,result)=>{
		if(err) return res.cc(err)
		if(email === result[0].email){
			res.send({
				status:0,
				message: '查询成功'
			})
		}else{
			res.send({
				status:1,
				message: '查询失败'
			})
		}
	})
}

// 修改密码 参数 newPassword id
exports.changePasswordInLogin = (req, res) => {
	const user = req.body
	user.newPassword = bcrypt.hashSync(user.newPassword, 10)
	const sql = 'update users set password = ? where id = ?'
	db.query(sql, [user.newPassword, user.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '更新成功'
		})
	})
}
