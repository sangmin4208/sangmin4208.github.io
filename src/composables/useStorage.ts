import getUser from '@/composables/getUser'
import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { storage } from '@/firebase/config'
import { ref } from 'vue'
import { STORAGE_PATH } from '@/types/storage'
const { user } = getUser()
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useStorage = (path: STORAGE_PATH) => {
  const error = ref('')
  const url = ref('')
  const filePath = ref('')

  const uploadImage = async (file: File) => {
    if (!user.value) return
    error.value = ''
    filePath.value = `${user.value.uid}/${path}/${Date.now()}`
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
