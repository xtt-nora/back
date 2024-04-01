// 引入express
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入file路由处理模块
const fileHandler = require('../router_handle/file')
// 上传文件
router.post('/uploadFile', fileHandler.uploadFile)
router.post('/bindFileAndUser', fileHandler.bindFileAndUser)
router.post('/fileFileList', fileHandler.fileFileList)
router.post('/deleteList', fileHandler.deleteList)

module.exports = router