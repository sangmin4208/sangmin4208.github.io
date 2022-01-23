<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import usePost from '../composables/usePost'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const { post } = await getPost(props.id)
const { updateDoc } = await usePost(props.id)
const handleSubmit = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await updateDoc(post.value!)
  router.go(-1)
}
</script>
<template>
  <!-- TODO: Update 페이지 꾸미기 -->
  <h1>Post Update {{ props.id }}</h1>
  <div v-if="post">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="post.title" />
      <textarea v-model="post.body" />
      <select v-model="post.type">
        <option value="series">series</option>
        <option value="article">article</option>
      </select>
      <button>Update</button>
    </form>
  </div>
</template>
<style></style>
