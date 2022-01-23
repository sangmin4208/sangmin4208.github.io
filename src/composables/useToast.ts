import { createToast } from 'mosha-vue-toastify'

const useToast = () => {
  const toast = createToast

  return { toast }
}
export default useToast
