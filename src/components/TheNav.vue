<script lang="ts" setup>
import getUser from '@/composables/getUser'
import useSignOut from '@/composables/useSignOut'
const { signOut } = useSignOut()
const { user } = getUser()
const handleLogout = async () => {
  await signOut()
}
</script>
<template>
  <!-- TODO: Nav 스타일 -->
  <nav>
    <div class="wrap">
      <h1 class="logo">
        <router-link :to="{ name: 'PostList' }">Nacho | Dev</router-link>
      </h1>
      <div class="links-container">
        <!-- <router-link :to="{ name: 'About' }">About Me</router-link> -->
        <router-link :to="{ name: 'PostList' }">Post</router-link>
        <div class="login-container" v-if="user">
          <router-link :to="{ name: 'PostCreate' }">Create</router-link>
          <p>Hello, {{ user.displayName }}</p>
          <button class="btn" @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
nav {
  background: var(--dark-bg-nav-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
  text-transform: uppercase;
  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    width: var(--md-container-width);
    margin: 0 auto;
  }
  .logo {
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
      color: white;
    }
  }
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
      transition: width 0.3s ease;
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
        width: 0px;
        height: 3px;
        border-radius: 3px 0px 0px 3px;
        position: absolute;
        right: 50%;
        bottom: -5px;
        background-color: #fff;
        translate: rotate(-180deg);
      }
      &::before {
        content: '';
        opacity: 0;
        transition: 0.5s;
        width: 0px;
        height: 3px;
        border-radius: 0px 3px 3px 0px;
        position: absolute;
        left: 50%;
        bottom: -5px;
        background-color: #fff;
      }
      &:hover::after {
        opacity: 1;
        width: 50%;
        background-color: var(--primary);
      }
      &:hover::before {
        opacity: 1;
        width: 50%;
        background-color: var(--primary);
      }
    }
  }
}
</style>
