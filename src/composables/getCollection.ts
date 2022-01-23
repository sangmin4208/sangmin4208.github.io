import { db } from '@/firebase/config'
import { Post } from '@/modules/posts/types'
import { collection, getDocs, query, QueryConstraint } from 'firebase/firestore'
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getCollection = async (path: string, ...options: QueryConstraint[]) => {
  const documents = ref<Post[]>([])
  const q = query(collection(db, path), ...options)
  const querySnapShot = await getDocs(q)
  querySnapShot.forEach((doc) => {
    if (doc.exists()) {
      documents.value.push({ ...doc.data(), id: doc.id } as Post)
    }
  })
  return { documents }
}

export default getCollection
