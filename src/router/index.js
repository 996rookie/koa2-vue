import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ('../views/home/Home') 
const Category = () => import ('../views/category/Category')
const Cart = () => import ('../views/cart/Cart')
const Profile = () => import ('../views/profile/Profile')
const Register = () => import ('../views/profile/Register')
const Login = () => import ('../views/profile/Login')
const GoodsDetail = () => import ('../components/content/GoodsDetail')
const MainTabBar = () => import ('../components/content/MainTabBar')

Vue.use(VueRouter)

const routes = [
  {path: '', redirect: '/home'},
  {path: '/', component: MainTabBar,
    children: [
      {path: '/home', component: Home},
      {path: '/category', component: Category},
      {path: '/cart', component: Cart},
      {path: '/profile', component: Profile}
    ]
  },
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {path: '/detail', component: GoodsDetail}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
