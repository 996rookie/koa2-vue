<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品分类列表"/>
    </div>
    <van-row>
      <!-- 左侧导航 -->
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li v-for="(item, index) in category" :key="index" @click="clickCategory(index, item.ID)" :class="{categoryActive: categoryIndex == index}">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </ul>
        </div>
      </van-col>
      <!-- 右侧导航 -->
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
            </van-tab>
          </van-tabs>
        </div>
        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodsList" :key="index">
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div>¥{{item.ORI_PRICE | MoneyFormat}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { getCategoryList, getCategorySubList, getCategorySubListId } from 'network/goods'
  import { Toast } from 'vant';
  export default {
    name: 'Category',
    data() {
      return {
        category: [],  //商品分类一级分类
        categoryIndex: 0,
        categorySub: [],  //商品分类二级分类
        active: 0,  //激活标签的值
        loading: false,  //上拉加载使用
        finished: false,  //下拉加载是否没有数据了
        page: 1,  //商品列表的页数
        goodsList: [],  //商品列表信息
        categorySubId: '',  //商品子类ID
        isRefresh:false,  //下拉加载
        errorImg:'this.src="' + require('assets/images/errorimg.png') + '"',  //错误图片显示路径
      }
    },
    created() {
      this.getCategoryList()
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight
      document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
      document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
    },
    methods: {
      getCategoryList() {
        getCategoryList().then(res => {
          if(res.data.code == 200 && res.data.message) {
            this.category = res.data.message
            this.getCategorySubList(this.category[0].ID)
          }else{
            Toast('服务器错误,数据获取失败')
          }
        })
      },
      getCategorySubList(categoryId) {
        let data = {
          categoryId: categoryId
        }
        getCategorySubList(data).then(res => {
          if(res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message
            this.active = 0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          }else{
            Toast('服务器错误,数据获取失败')
          }
        })
      },
      getCategorySubListId() {
        let data = {
          categorySubId: this.categorySubId,
          page: this.page
        }
        getCategorySubListId(data).then(res => {
          if(res.data.code == 200 && res.data.message.length) {
            this.page++
            this.goodsList = this.goodsList.concat(res.data.message)
          }else{
            this.finished = true
          }
          this.loading = false
        })
      },
      // 点击一级分类获取二级分类信息
      clickCategory(index, categoryId) {
        this.categoryIndex = index
        this.page = 1
        this.finished = false
        this.goodsList = []
        this.getCategorySubList(categoryId)
      },
      // 点击二级子类获取商品信息
      onClickCategorySub(index) {
        this.categorySubId = this.categorySub[index].ID
        this.goodsList = []
        this.finished = false
        this.page = 1
        this.onLoad()
      },
      // 上拉加载数据
      onLoad() {
        setTimeout(() => {
          this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
          this.getCategorySubListId()
        }, 1000)
      },
      // 下拉重新加载数据
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false
          this.finished = false
          this.goodsList = []
          this.page = 1
          this.onLoad()
        }, 500)
      },
      // 跳转到商品详情页
      goGoodsInfo(id) {
        this.$router.push({path: '/detail', query: {goodsId: id}})
      }
    }
  }
</script>

<style scoped>
  #leftNav {
    background-color: aliceblue;
  } 
  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 0.1875rem;
    font-size: .8rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item {
    display: flex;
    font-size: .8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 0.3125rem;
  }

  #list-div {
    overflow: scroll;
  }

  .list-item-img {
    flex: 8;
  }

  .list-item-text {
    flex: 16;
    margin-top: 0.625rem;
    margin-left: 0.625rem;
  }
</style>