
// 登录注册模块路由
// 导入express框架
const express = require('express')
const Joi = require('joi')
// 使用express框架的路由
const router = express.Router()
// 导入login的路由处理模块
const loginHandler = require('../router_handle/login')
// 导入expreJoi
const expressJoi = require('@escook/express-joi')
// 导入验证规则
const {
	limit_login
} = require('../limit/login.js')

// 注册
router.post('/register',expressJoi(limit_login),loginHandler.register)
// 登录
router.post('/login',expressJoi(limit_login),loginHandler.login)

//------------------------------------------------用户管理
// 添加管理员
router.post('/createAdmin',loginHandler.createAdmin)
//获取管理员列表
router.post('/getAdminList',loginHandler.getAdminList)
// 修改管理员成功
router.post('/editAdmin',loginHandler.editAdmin)
//将管理员降级
router.post('/changeIdentity',loginHandler.changeIdentity)
//将用户升级，此时前端传来了身份这个参数
router.post('/changeIdentityToAdmin',loginHandler.changeIdentityToAdmin)
//搜索用户
router.post('/searchUser',loginHandler.searchUser)
// 删除用户
router.post('/deleteUser',loginHandler.deleteUser)

// 向外暴露路由
module.exports = router