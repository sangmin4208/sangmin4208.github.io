<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import usePost from '../composables/usePost'
import TheMarkdown from '@/components/TheMarkdown.vue'
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
  <div class="body" v-if="post">
    {{ post }}
    <TheMarkdown :source="post.body"></TheMarkdown>
  </div>
  <button class="btn" @click.prevent="handleDelete">DELETE</button>
  <button class="btn" @click.prevent="handleUpdate">Update</button>
</template>
<style scoped lang="scss">
.btn {
  margin-top: 1em;
  margin-right: 0.8em;
}
</style>
