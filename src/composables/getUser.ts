import getDocument from '@/composables/getDocument'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from '@/firebase/config'

const user = ref(auth.currentUser)
const ownership = ref(false)
onAuthStateChanged(auth, async (_user) => {
  user.value = _user

  if (!_user) return
  const { document: userInfo } = await getDocument<{
    displayName: string
    level: number
  }>('users', _user.uid)
  if (!userInfo.value) return
  if (_user.displayName !== userInfo.value.displayName) {
    updateProfile(_user, { displayName: userInfo.value.displayName })
  }
  if (userInfo.value.level === -1) {
    // setCustomUserClaims(uid, { admin: true })
    ownership.value = true
  } else {
    ownership.value = false
  }
})

const getUser = () => {
  return { user, ownership }
}

export default getUser
