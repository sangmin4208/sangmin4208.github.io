import { RouteRecordRaw } from 'vue-router'
import AuthLogin from '@/modules/auth/components/AuthLogin.vue'
const route: Array<RouteRecordRaw> = [
  {
    path: 'login',
    name: 'AuthLogin',
    component: AuthLogin,
  },
]

export default route
