const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')  //解决跨域

// 注册引入中间件
app.use(bodyParser())
app.use(cors())

// 引入user.js模块
let user = require('./appApi/user')
let goods = require('./appApi/goods')

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async () => {
    await connect()
    initSchemas()
})()

app.listen(3000, ()=>{
    console.log('koa服务启动成功!')
})