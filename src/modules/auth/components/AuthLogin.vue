<script lang="ts" setup>
import useSignin from '../composables/useSignin'
import { useRouter } from 'vue-router'
import useToast from '@/composables/useToast'
// TODO: Signin.vue
const { signInWithGitHub } = useSignin()
const { toast } = useToast()

const router = useRouter()
const handleSignin = async () => {
  const user = await signInWithGitHub()
  toast(`Hello, ${user.displayName}`, {
    timeout: 1500,
    position: 'bottom-center',
    hideProgressBar: true,
  })
  router.replace({ name: 'PostList' })
}
</script>

<template>
  <h1>Auth Login</h1>
  <button @click="handleSignin">Signup With GitHub</button>
</template>
