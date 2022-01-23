import { createToast } from 'mosha-vue-toastify'

const useToast = () => {
  const toast = (message: string) => {
    createToast(message, {
      timeout: 1500,
      position: 'bottom-center',
      hideProgressBar: true,
    })
  }

  return { toast }
}
export default useToast
