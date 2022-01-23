import { Post } from '@/modules/posts/types'
import { timestamp } from '@/firebase/config'
import useDocuments from '@/composables/useDocument'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePost = (id: string) => {
  const { deleteDoc: _deleteDoc, updateDoc: _updateDoc } = useDocuments(
    'posts',
    id
  )
  const deleteDoc = async () => {
    await _deleteDoc()
  }
  const updateDoc = async (post: Post) => {
    post.updateAt = timestamp().toDate()
    await _updateDoc(post)
  }
  return { deleteDoc, updateDoc }
}

export default usePost
