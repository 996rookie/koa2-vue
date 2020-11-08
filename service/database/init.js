const mongoose = require('mongoose')
const db = 'mongodb://localhost/mall-vue'
const glob = require('glob')
const path = require('path')

// 引入所有的的Schema文件
exports.initSchemas = () => {
  glob.sync(path.join(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开......');
      if(maxConnectTimes <= 3) {
        maxConnectTimes++
        // 进行重连
        mongoose.connect(db)
      }else{
        reject()
        throw new Error('数据库出现问题......')
      }  
    })

    // 数据库出现错误的时候
    mongoose.connection.on('error', err => {
      console.log('数据库错误......');
      if(maxConnectTimes <= 3) {
        maxConnectTimes++
        // 进行重连
        mongoose.connect(db)
      }else{
        reject(err)
        throw new Error('数据库出现问题......')
      }
    })

    // 连接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB连接成功!');
      resolve()
    })
  })
}