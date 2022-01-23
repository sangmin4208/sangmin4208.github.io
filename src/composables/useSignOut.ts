import { auth } from '@/firebase/config'
import { signOut as _signOut } from 'firebase/auth'
import useToast from '@/composables/useToast'
import getUser from '@/composables/getUser'

const useSignOut = () => {
  const signOut = async () => {
    const { user } = getUser()
    const userName = user.value?.displayName
    const { toast } = useToast()
    await _signOut(auth)
    toast(`Bye, ${userName}`)
  }
  return { signOut }
}

export default useSignOut
