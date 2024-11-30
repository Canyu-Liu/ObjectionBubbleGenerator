// 从 vue-router 库中导入创建路由器所需的功能
import { createRouter, createWebHistory } from 'vue-router'
// 从 views 目录中导入 HomeView 组件用于路由
import MainView from '@/views/MainView.vue'

// 创建一个路由器实例
const router = createRouter({
  // 使用 HTML5 历史模式管理路由，基础 URL 从环境变量中获取
  history: createWebHistory(import.meta.env.BASE_URL),
  // 定义路由规则，每个路由对应一个路径和组件
  routes: [
    {
      // 首页路由
      path: '/',
      name: 'main',
      component: MainView
    },
  ]
})

// 导出路由器实例作为默认导出
export default router