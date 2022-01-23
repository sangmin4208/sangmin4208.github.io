import getCollection from '@/composables/getCollection'
import { orderBy } from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getPosts = async () => {
  const { documents: posts } = await getCollection(
    'posts',
    orderBy('createAt', 'desc')
  )
  return { posts }
}

export default getPosts
