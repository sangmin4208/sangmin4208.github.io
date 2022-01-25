import { ref } from 'vue'
import getCollection from '@/composables/getCollection'

const tags = ref<string[]>([])
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getTags = async () => {
  const { documents } = await getCollection('tags')
  tags.value = documents.value.map((doc: { id: string }) => {
    return doc.id
  })
  return { tags }
}

export default getTags
