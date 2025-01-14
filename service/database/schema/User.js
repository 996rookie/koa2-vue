const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')  //密码加密
const SALT_WORK_FACTOR = 10  //加盐强度设置为10

let ObjectId = Schema.Types.ObjectId

// 创建用户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  password: {type: String},
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})

// 每次存储数据时都要执行
userSchema.pre('save', function(next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  // 密码比对方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model('User', userSchema)