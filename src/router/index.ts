import PostList from '@/modules/posts/components/PostList.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Auth from '@/views/Auth.vue'

import PostRoute from './post'
import AuthRoute from './auth'
import User from '@/views/User.vue'
import UserDetails from '@/modules/user/components/UserDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Post',
    component: Post,
    children: PostRoute,
  },
  {
    path: '/test',
    name: 'Test',
    component: PostList,
  },

  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: { name: 'AuthLogin' },
    children: AuthRoute,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      {
        path: '/',
        component: UserDetails,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
