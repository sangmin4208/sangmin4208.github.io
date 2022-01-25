import useCollection from '@/composables/useCollection'

const { addDoc: _addDoc } = useCollection('tags')
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTags = () => {
  const addTag = async (tag: string) => {
    await _addDoc({ id: tag })
  }

  return { addTag }
}

export default useTags
