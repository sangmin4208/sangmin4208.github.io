import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import About from '@/views/About.vue'
import Post from '@/views/Post.vue'
import Auth from '@/views/Auth.vue'

import PostRoute from './post'
import AuthRoute from './auth'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'About',
  //   component: About,
  // },
  {
    path: '/',
    redirect: { name: 'PostList' },
  },
  {
    path: '/posts',
    name: 'Post',
    component: Post,
    children: PostRoute,
  },

  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: { name: 'AuthLogin' },
    children: AuthRoute,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
