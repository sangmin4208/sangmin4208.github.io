<script lang="ts" setup>
import getUser from '@/composables/getUser'
import useSignOut from '@/composables/useSignOut'
import useToast from '@/composables/useToast'
const { user } = getUser()
const { signOut } = useSignOut()
const { toast } = useToast()
const handleLogout = async () => {
  const userName = user.value?.displayName
  await signOut()
  toast(`Bye, ${userName}`, {
    timeout: 1500,
    position: 'bottom-center',
    hideProgressBar: true,
  })
}
</script>
<template>
  <!-- TODO: Nav 스타일 -->
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'PostList' }">Post</router-link>
    <router-link :to="{ name: 'User' }">User</router-link>
    <router-link :to="{ name: 'PostCreate' }">Create</router-link>
  </nav>
  <div v-if="user">
    <button @click="handleLogout">Logout</button>
    <p>Hello, {{ user.displayName }}</p>
  </div>
  <div v-else>
    <router-link :to="{ name: 'AuthLogin' }">Login</router-link>
  </div>
</template>

<style></style>
