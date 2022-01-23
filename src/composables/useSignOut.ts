import { auth } from '@/firebase/config'
import { signOut as _signOut } from 'firebase/auth'

const useSignOut = () => {
  const signOut = async () => {
    await _signOut(auth)
  }
  return { signOut }
}

export default useSignOut
