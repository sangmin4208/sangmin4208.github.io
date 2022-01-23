import getCollection from '@/composables/getCollection'
import { Tag } from '../types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getTags = async () => {
  const { documents: tags } = await getCollection('tags')
  tags.value = tags.value.map((doc: { id: string }) => {
    console.log(doc)
    return doc.id
  })
  console.log(tags)
  return { tags }
}

export default getTags
