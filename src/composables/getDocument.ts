import { db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { Ref, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getDocument = async <T>(path: string, id: string) => {
  const docRef = doc(db, path, id)
  const document: Ref<T | null> = ref(null)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    document.value = { ...docSnap.data(), id: docSnap.id } as unknown as T
  } else {
    throw Error(`${path} / ${id} doesn't exist`)
  }
  return { document }
}

export default getDocument
