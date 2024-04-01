const db = require('../db/index')
// 用于处理文件
fs = require("fs");

/**
 * file_name 文件名
 * file_url 文件地址
 * file_size 文件大小
 * upload_person 上传者 
 * upload_time 上传时间
 * download_number 下载次数
 */

// 上传文件
exports.uploadFile = (req, res) => {
	let oldName = req.files[0].filename;
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	let upload_time = new Date()
	const sql1 = 'select * from files where file_name = ?'
	 db.query(sql1,newName,(err,results)=>{
		 if(results.length>1){
			 res.send({
				 status:1,
				 message:'文件名已存在'
			 })
		 }else{
			fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
			const sql = 'insert into files set ?'
			db.query(sql,{
				file_url: `http://192.168.0.208:3007/upload/${newName}`,
				file_name: newName,
				file_size: req.files[0].size * 1 / 1024,
				upload_time,
				download_number: 0
			},(err,results)=>{
				if (err) return res.cc(err)
				res.send({
					status:0,
					url:'http://192.168.0.208:3007/upload'+newName
				})
			})
		 }
	 })
}

// 绑定上传者
exports.bindFileAndUser = (req,res)=>{
	
	const {
		name,
		url
	} = req.body
	const sql = 'update files set upload_person = ? where file_url = ?'
	db.query(sql,[name,url], (err, results)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'绑定成功'
		})
	})
}

//获取文件列表
exports.fileFileList = (req,res) => {
	const sql = 'select * from files '
	db.query(sql,req.body.id,(err,results)=>{
		if(err) return res.cc(err)
		res.send(results)
	})
}

exports.deleteList = (req,res) =>{
	const sql = `delete from files where id = ? `
	db.query(sql,req.body.id,(err,results)=>{
		fs.unlink(`./public/upload/${req.body.file_name}`,(err)=>{
			if(err) return res.cc(err)
		})
		if(err) return res.cc(err)
		res.send({
			status: 0,
			message: '删除成功'
		})
	})
}