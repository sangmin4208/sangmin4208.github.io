import { db } from '@/firebase/config'
import {
  deleteDoc as _deleteDoc,
  doc,
  updateDoc as _updateDoc,
} from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDocuments = (path: string, id: string) => {
  const documentRef = doc(db, path, id)
  const deleteDoc = async () => {
    await _deleteDoc(documentRef)
  }
  const updateDoc = async <T>(data: T) => {
    await _updateDoc(documentRef, data)
  }
  return { deleteDoc, updateDoc }
}

export default useDocuments
