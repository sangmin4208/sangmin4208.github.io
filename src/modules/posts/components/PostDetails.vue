<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import getUser from '@/composables/getUser'
import usePost from '../composables/usePost'
import TheMarkdown from '@/components/TheMarkdown.vue'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const router = useRouter()
const { ownership } = getUser()
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
  <div class="container">
    <div class="tag-container input-tag-container">
      <h1>Tags :</h1>
      <span v-for="tag in post?.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <div class="body" v-if="post">
      <TheMarkdown :source="post.body"></TheMarkdown>
    </div>
    <div v-if="ownership">
      <button class="btn btn-warn hover" @click.prevent="handleDelete">
        DELETE
      </button>
      <button class="btn btn-secondary hover" @click.prevent="handleUpdate">
        Update
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  background: var(--dark-bg-nav-color);
  padding: 20px;
  border-radius: 5px;
}
.btn {
  margin-top: 1em;
  margin-right: 0.8em;
}
.tag-container {
  align-items: center;
  display: flex;
  margin-top: 15px;
  gap: 10px;
}
</style>
