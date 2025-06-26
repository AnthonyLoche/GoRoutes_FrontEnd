import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AuthService } from '@/services'
import { useRouter } from 'vue-router'
import { showSuccessToast } from '@/utils/toast'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const state = useStorage('auth', {
    user: {},
    isLogged: false,
    error: false,
    type: '',
    token: '',
    message: '',
  })

  async function login(username, password) {
    try {
      const response = await AuthService.login(username, password)
      console.log(response)

      state.value.token = response.data.access
      state.value.isLogged = true
      state.value.user = response.data.user

      if (state.value.user.driver_data) {
        router.push('/blank/profile/driver')
        state.value.user.type = 'driver'
      } else if (state.value.user.responsible_data) {
        router.push('/blank/profile/responsible')
        state.value.user.type = 'responsible'
      } else if (state.value.user.passenger_data && state.value.user.passenger_data.is_student) {
        router.push('/blank/profile/student')
        state.value.user.type = 'student'
      } else if (state.value.user.passenger_data) {
        router.push('/blank/profile/passenger')
        state.value.user.type = 'passenger'
      }
      showSuccessToast('Login realizado com sucesso!')
    } catch (error) {
      state.error = true
      state.message = error.message || 'Erro ao fazer login'
    }
  }

  async function register(data) {
    try {
      const response = await AuthService.registerResponsible(data)
      return response
    } catch (error) {
      return error
    }
  }

  async function updatePicture(data) {
    try {
      const response = await AuthService.updatePicture(data)
      state.value.user.picture_file = response.data.picture
      showSuccessToast('Foto atualizada com sucesso!')
      return response
    } catch (error) {
      state.error = true
      return error
    }
  }

  async function logout() {
    state.token = ''
    state.isLogged = false
    state.user = {}
    state.error = false
    state.message = ''
    router.push('/blank/login')
  }

  return {
    state,
    login,
    logout,
    register,
    updatePicture,
  }
})
