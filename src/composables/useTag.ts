import { db } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTag = () => {
  const addTag = async (tag: string) => {
    await setDoc(doc(db, 'tags', tag), {})
  }

  return { addTag }
}

export default useTag
