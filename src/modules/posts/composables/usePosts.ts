import { Post } from '@/modules/posts/types'
import { timestamp } from '@/firebase/config'
import useCollection from '@/composables/useCollection'
const { addDoc: _addDoc } = useCollection('posts')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePosts = () => {
  const addDoc = async (data: Post) => {
    data.createAt = timestamp().toDate()
    await _addDoc<Post>(data)
  }

  return { addDoc }
}

export default usePosts
