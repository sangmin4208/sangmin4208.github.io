import { Post } from '@/modules/posts/types'
import { timestamp } from '@/firebase/config'
import useCollection from '@/composables/useCollection'
import getTags from '@/composables/getTags'
import useTag from '@/composables/useTag'
const { addDoc: _addDoc } = useCollection('posts')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePosts = () => {
  const addDoc = async (data: Post) => {
    const { tags } = await getTags()
    const { addTag } = await useTag()
    const toAddTags = data.tags?.filter((tag) => {
      return !tags.value.includes(tag)
    })
    console.log(toAddTags)
    toAddTags?.forEach(async (tag) => {
      await addTag(tag)
    })
    data.createAt = timestamp().toDate()
    await _addDoc<Post>(data)
  }

  return { addDoc }
}

export default usePosts
