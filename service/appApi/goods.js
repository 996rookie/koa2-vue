const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo', async(ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        console.log('数据导入成功');
      }).catch(error => {
        console.log('数据导入失败:' + error);
      })
    })
  })
})

router.get('/insertAllCategory', async(ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        console.log('数据导入成功');
      }).catch(error => {
        console.log('数据导入失败:' + error);
      })
    })
  })
})

router.get('/insertAllCategorySub', async(ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        console.log('数据导入成功');
      }).catch(error => {
        console.log('数据导入失败:' + error);
      })
    })
  })
})

// 获取商品详细信息的接口
router.post('/getDetailGoodsInfo', async(ctx) => {
  try{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID: goodsId}).exec()
    ctx.body = {code: 200, message: result}
  }catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

// 读取大类数据的接口
router.get('/getCategoryList', async(ctx) => {
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {code: 200, message: result}
  }catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

// 读取小类数据的接口
router.post('/getCategorySubList', async(ctx) => {
  try{
    let categoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {code: 200, message: result}
  }catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubId', async(ctx) => {
  try{
    let categorySubId = ctx.request.body.categorySubId  //子类别ID
    let page = ctx.request.body.page //当前页数
    let num = 10 //每页显示数量
    let start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
    ctx.body = {code: 200, message: result}
  }catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
