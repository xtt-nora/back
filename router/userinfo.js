// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入userinfo的路由处理模块
const userinfoHandler = require('../router_handle/userinfo')
// 导入expreJoi
const expressJoi = require('@escook/express-joi')

// 上传接口
router.post('/uploadAvatar',userinfoHandler.uploadAvatar)
router.post('/bindAccount',userinfoHandler.bindAccount)
router.post('/getUserInfo',userinfoHandler.getUserInfo)


// 向外暴露路由
module.exports = router