<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import usePost from '../composables/usePost'
import Markdown from 'vue3-markdown-it'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const { post } = await getPost(props.id)
const { deleteDoc } = await usePost(props.id)
const handleDelete = async () => {
  await deleteDoc()
  router.go(-1)
}
const handleUpdate = () => {
  router.push({ name: 'PostUpdate', params: { id: props.id } })
}
</script>
<template>
  <!-- TODO: 디테일 페이지 꾸미기 -->
  <h1>{{ props.id }}</h1>
  <h1>Post Details {{ props.id }}</h1>
  <div v-if="post">
    {{ post }}
    <Markdown :source="post.body" />
  </div>
  <button @click.prevent="handleDelete">DELETE</button>
  <button @click.prevent="handleUpdate">Update</button>
</template>
<style></style>
