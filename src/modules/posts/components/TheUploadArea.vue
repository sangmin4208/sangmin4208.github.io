<script lang="ts" setup>
import useStorage from '@/composables/useStorage'
import { defineEmits } from 'vue'
import { UploadFile } from '../types'

const { url, filePath, uploadImage } = useStorage('post')
const emit = defineEmits(['upload'])

const handleDrop = async (e: DragEvent) => {
  const data = e.dataTransfer
  if (data) {
    const file = data.files[0]
    await uploadImage(file)
    emit('upload', { url: url.value, filePath: filePath.value } as UploadFile)
  }
}
</script>

<template>
  <h2>Uplade Images (Drag & Drop)</h2>
  <div
    @drop.prevent="handleDrop"
    @dragenter.prevent
    @dragover.prevent
    class="upload-area"
  ></div>
</template>

<style>
.upload-area {
  width: 100%;
  height: 20vh;
  background-color: transparent;
  border: 1px solid white;
  z-index: 9999;
}
</style>
