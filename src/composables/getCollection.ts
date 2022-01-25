import { db } from '@/firebase/config'
import { collection, getDocs, query, QueryConstraint } from 'firebase/firestore'
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getCollection = async (path: string, ...options: QueryConstraint[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documents = ref<any>([])
  const q = query(collection(db, path), ...options)
  const querySnapShot = await getDocs(q)
  querySnapShot.forEach((doc) => {
    if (doc.exists()) {
      documents.value.push({ ...doc.data(), id: doc.id })
    }
  })
  return { documents }
}

export default getCollection
