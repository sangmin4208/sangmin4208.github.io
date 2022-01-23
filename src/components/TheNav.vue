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
    <div class="wrap">
      <h1>
        <router-link :to="{ name: 'Home' }">Nacho | Dev</router-link>
      </h1>
      <div class="links-container">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'PostList' }">Post</router-link>
        <router-link :to="{ name: 'User' }">User</router-link>
        <router-link :to="{ name: 'PostCreate' }">Create</router-link>
      </div>
    </div>
  </nav>
  <div v-if="user">
    <button @click="handleLogout">Logout</button>
    <p>Hello, {{ user.displayName }}</p>
  </div>
  <div v-else>
    <router-link :to="{ name: 'AuthLogin' }">Login</router-link>
  </div>
</template>

<style lang="scss">
nav {
  background: var(--dark-bg-nav-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    width: var(--md-container-width);
    margin: 0 auto;
  }
  .links-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    a {
      position: relative;
      margin-right: 20px;
      opacity: 0.8;
      transition: 0.5s;
      &:hover {
        font-weight: 600;
        color: #fff;
        opacity: 1;
        transform: scale(1.1);
      }
      &::after {
        content: '';
        opacity: 0;
        transition: 0.5s;
        width: 100%;
        height: 3px;
        border-radius: 3px;
        position: absolute;
        bottom: -5px;
        transform: translateX(-100%);
        background-color: #fff;
      }
      &:hover::after {
        opacity: 1;
        background-color: var(--primary);
      }
    }
  }
}
</style>
