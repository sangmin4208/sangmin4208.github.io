<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { IMAGE_TYPE, UploadFile } from '../types'
import getTags from '../../../composables/getTags'
import useStorage from '@/composables/useStorage'
import TheMarkdown from '../../../components/TheMarkdown.vue'
import TheImageContainer from './TheImageContainer.vue'
import TheUploadArea from './TheUploadArea.vue'
import getPost from '../composables/getPost'
import usePost from '../composables/usePost'
import PostListItem from './PostListItem.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const { post } = await getPost(props.id)
const showPreview = ref<boolean>(false)
const thumnailInput = ref<HTMLInputElement | null>(null)
const { url, filePath, uploadImage, deleteImage } = useStorage('thumnail')
const { updateDoc } = usePost(props.id)
const { tags: existTags } = await getTags()
const handleUplade = async () => {
  if (!post.value) return
  await updateDoc(post.value)
  await getPost(props.id)
}

// onBeforeUnmount(() => {
//   if (!post.value) return
//   if (post.value.thumnailPath) {
//     deleteImage(post.value.thumnailPath)
//   }
//   if (post.value.files) {
//     post.value.files.forEach((file) => {
//       deleteImage(file.filePath)
//     })
//   }
// })

const handleInputTag = (e: KeyboardEvent) => {
  if (!post.value) return
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!e.target) return
  const target = e.target as HTMLInputElement
  if (post.value.tags) {
    const temp = new Set<string>([...post.value.tags, target.value])
    post.value.tags = Array.from(temp)
  } else {
    post.value.tags = [target.value]
  }
  target.value = ''
}

const handleClickTag = (tag: string) => {
  if (!post.value) return
  tag = tag.toLowerCase()
  if (post.value.tags) {
    const temp = new Set<string>([...post.value.tags, tag])
    post.value.tags = Array.from(temp)
  } else {
    post.value.tags = [tag]
  }
}
const handleDeleteTag = (targetTag: string) => {
  if (!post.value) return
  post.value.tags = post.value.tags?.filter((tag) => !(tag === targetTag))
}

const handleThumNailUpload = async (e: Event) => {
  if (!e.target) return
  if (!post.value) return
  const target = e.target as HTMLInputElement
  let selected = target.files ? target.files[0] : null
  if (selected && IMAGE_TYPE.includes(selected?.type)) {
    if (post.value.thumnailPath) {
      await deleteImage(post.value.thumnailPath)
      post.value.thumnailPath = ''
      post.value.thumnailURL = ''
    }
    await uploadImage(selected)
    post.value.thumnailPath = filePath.value
    post.value.thumnailURL = url.value
  } else {
    if (post.value.thumnailPath) {
      await deleteImage(post.value.thumnailPath)
      post.value.thumnailPath = ''
      post.value.thumnailURL = ''
    }
  }
}
const handleImageUpload = (file: UploadFile) => {
  if (!post.value) return
  post.value.files?.push(file)
  post.value.body += `\n <div style="display:flex; justify-content: center">
<img src="${file.url}" alt="content-image" style="width:500px;"/>
</div>`
}
const handleImageDelete = async (targetFile: UploadFile) => {
  if (!post.value) return
  if (!post.value.files) return
  await deleteImage(targetFile.filePath)
  post.value.body = post.value.body.replaceAll(
    `<div style="display:flex; justify-content: center">
<img src="${targetFile.url}" alt="content-image" style="width:500px;"/>
</div>`,
    ''
  )
  post.value.files = post.value.files.filter(
    (file) => !(file.filePath === targetFile.filePath)
  )
}
</script>
<template>
  <div v-if="post">
    <button class="btn btn-preview" @click.prevent="showPreview = !showPreview">
      preview
    </button>

    <div v-if="!showPreview" class="mt-1">
      <div>
        <img
          class="thumnail-image"
          v-if="post.thumnailURL"
          :src="post.thumnailURL"
        />
      </div>
      <form @submit.prevent="handleUplade">
        <input
          class="input-title"
          type="text"
          v-model="post.title"
          placeholder="Title..."
        />
        <textarea v-model="post.desc" placeholder="Description..."></textarea>
        <textarea
          class="input-body"
          v-model="post.body"
          placeholder="Body..."
        ></textarea>
        <input
          @change.prevent="handleThumNailUpload"
          type="file"
          ref="thumnailInput"
        />

        <div class="tag-container exist-tag-container">
          <h1>Existing Tags :</h1>
          <span
            v-for="tag in existTags"
            :key="tag"
            class="tag"
            @click.prevent="handleClickTag(tag)"
            >{{ tag }}</span
          >
        </div>
        <input
          @keydown.prevent.enter="handleInputTag"
          class="input-tag"
          type="text"
          placeholder="Input tag"
        />
        <div class="tag-container input-tag-container">
          <h1>Tags :</h1>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="tag"
            @click.prevent="handleDeleteTag(tag)"
            >{{ tag }}</span
          >
        </div>
        <TheImageContainer
          @delete="handleImageDelete"
          :images="post.files!"
        ></TheImageContainer>
        <TheUploadArea @upload="handleImageUpload" />
        <button class="btn btn-submit">UPDATE</button>
      </form>
    </div>
    <div v-else class="mt-1">
      <PostListItem :post="post"></PostListItem>
      <div class="preview-conatiner">
        <TheMarkdown :source="post.body"></TheMarkdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.thumnail-image {
  width: 150px;
}
.preview-container {
  border: 1px solid white;
  margin: auto auto;
  min-height: 10vh;
  margin-top: 20px;
  padding: 15px;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  input,
  textarea {
    background-color: inherit;
    outline: 0;
    padding: 0.5rem 0.3rem;
  }
  input {
    border: 0;
    outline: 0;
    border-bottom: 1px solid gray;
  }
  input::placeholder {
    font-weight: bold;
  }
  .input-title {
    border-bottom: 1px solid gray;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .input-body {
    height: 30vh;
  }
  .tag {
    text-transform: uppercase;
    padding: 2px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.5s;
    background-color: var(--primary);
  }

  .tag:hover {
    transform: scale(1.1);
  }
  .tag-container {
    align-items: center;
    display: flex;
    margin-top: 15px;
    gap: 10px;
  }
  .exist-tag-container {
    border: 1px solid gray;
    padding: 20px 15px;

    .tag {
      font-weight: bold;
      background-color: gray;
    }
    .tag:hover {
      background-color: var(--primary);
    }
  }
}

.btn-submit {
  margin-left: auto;
  background-color: var(--secondary);
}
</style>
