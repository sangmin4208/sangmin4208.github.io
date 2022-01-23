<script lang="ts" setup>
import { reactive } from 'vue'
import usePosts from '../composables/usePosts'
import { Post } from '../types'
import Markdown from 'vue3-markdown-it'
import useToast from '@/composables/useToast'

const post = reactive<Post>({
  author: 'nacho',
  title: 'Awesome CSS',
  body: '# test body',
  series: 'hello',
  type: 'series',
})
const { toast } = useToast()
const { addDoc } = usePosts()
const handleCreate = async () => {
  await addDoc(post)
  toast('포스트')
}
</script>
<template>
  {{ post }}
  <!-- TODO: CREATE FORM 작성, MarkDown library 찾기  -->
  <input type="text" v-model="post.title" />
  <textarea v-model="post.body"></textarea>
  <Markdown :source="post.body" />
  <button @click="handleCreate">Post 생성</button>
  <!-- TODO: Pending 추가 -->
  <!-- <button  disabled>생성중...</button> -->
</template>
