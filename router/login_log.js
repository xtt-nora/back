const express = require('express')
const router = express.Router()
const loginLogHandler = require('../router_handle/login_log.js')


router.post('/loginLog',loginLogHandler.loginLog)
router.post('/loginLogList',loginLogHandler.loginLog)
router.post('/loginLogListLength',loginLogHandler.loginLog)
module.export = router