import { timestamp } from '@/firebase/config'
import useDocuments from '@/composables/useDocument'
import getPost from './getPost'
import useStorage from '@/composables/useStorage'
import { Post } from '../types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePost = (id: string) => {
  const { deleteDoc: _deleteDoc, updateDoc: _updateDoc } = useDocuments(
    'posts',
    id
  )
  const deleteDoc = async () => {
    const { post } = await getPost(id)
    const { deleteImage: deletePostImage } = useStorage('post')
    const { deleteImage: deleteThumnailImage } = useStorage('thumnail')
    if (post.value) {
      post.value.files?.forEach((file) => {
        deletePostImage(file.filePath)
      })
      deleteThumnailImage(post.value.thumnailPath)
    }
    await _deleteDoc()
  }
  const updateDoc = async (post: Post) => {
    post.updateAt = timestamp().toDate()
    await _updateDoc(post)
  }
  return { deleteDoc, updateDoc }
}

export default usePost
