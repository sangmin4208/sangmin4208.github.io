import { Post } from '@/modules/posts/types'
import getDocument from '@/composables/getDocument'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getPost = async (id: string) => {
  const { document: post } = await getDocument<Post>('posts', id)
  return { post }
}

export default getPost
