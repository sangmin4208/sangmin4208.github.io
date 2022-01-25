import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { storage } from '@/firebase/config'
import { ref } from 'vue'

const useStorage = (path: string) => {
  const error = ref('')
  const url = ref('')
  const filePath = ref('')

  const uploadImage = async (file: File) => {
    error.value = ''
    filePath.value = `${path}/${Date.now()}`
    const storageRef = StorageRef(storage, filePath.value)
    try {
      const res = await uploadBytes(storageRef, file)
      url.value = await getDownloadURL(res.ref)
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      console.log(message)
      error.value = message
    }
  }
  const deleteImage = async (path: string) => {
    error.value = ''
    const storageRef = StorageRef(storage, path)
    try {
      await deleteObject(storageRef)
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      console.log(message)
      error.value = message
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage
