import { auth } from '@/firebase/config'
import {
  GithubAuthProvider,
  signInWithPopup,
  // updateCurrentUser,
  // updateProfile,
} from 'firebase/auth'

const useSignin = () => {
  // Sign in using a popup.
  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)

    // The signed-in user info.
    const user = result.user
    // This gives you a Facebook Access Token.
    // const credential = GithubAuthProvider.credentialFromResult(result)
    // const token = credential.accessToken
    GithubAuthProvider.credentialFromResult(result)
    return user
  }
  return { signInWithGitHub }
}

export default useSignin
