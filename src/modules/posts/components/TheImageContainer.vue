<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import { UploadFile } from '../types'

const props = defineProps({
  images: {
    type: Object as PropType<UploadFile[]>,
    required: true,
  },
})
const emit = defineEmits(['delete'])
const handleRemove = (image: UploadFile) => {
  emit('delete', image)
}
</script>

<template>
  <div class="image-container">
    <div v-for="image in props.images" :key="image.filePath" class="wrap">
      <img :src="image.url" />
      <div>
        <span @click="handleRemove(image)" class="material-icons"
          >remove_circle_outline</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
span {
  cursor: pointer;
}
.image-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  .wrap {
    width: 200px;
    display: flex;
    img {
      width: 100%;
    }
  }
}
</style>
