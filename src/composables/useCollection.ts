import { db } from '@/firebase/config'
import { addDoc as _addDoc, collection } from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCollection = (path: string) => {
  const collectionRef = collection(db, path)
  const addDoc = async <T>(data: T) => {
    await _addDoc(collectionRef, data)
  }

  return { addDoc }
}

export default useCollection
