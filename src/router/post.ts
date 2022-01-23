import { RouteRecordRaw } from 'vue-router'
import PostList from '@/modules/posts/components/PostList.vue'
import PostUpdate from '@/modules/posts/components/PostUpdate.vue'
import PostDetails from '@/modules/posts/components/PostDetails.vue'
import PostCreate from '@/modules/posts/components/PostCreate.vue'

const route: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'PostList',
    component: PostList,
  },
  {
    path: 'create',
    name: 'PostCreate',
    component: PostCreate,
  },
  {
    path: ':id',
    name: 'PostDetails',
    component: PostDetails,
    props: true,
  },
  {
    path: 'update/:id',
    name: 'PostUpdate',
    component: PostUpdate,
    props: true,
  },
]

export default route
