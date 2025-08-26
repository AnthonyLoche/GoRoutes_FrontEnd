import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AuthService } from '@/services'
import { useRouter } from 'vue-router'
import { showSuccessToast } from '@/utils/toast'

// Função para verificar se localStorage está disponível
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // Usa sessionStorage como fallback se localStorage não estiver disponível
  const storage = isLocalStorageAvailable() ? localStorage : sessionStorage
  const state = useStorage('auth', {
    user: {},
    isLogged: false,
    error: false,
    type: '',
    token: '',
    message: '',
  })

  async function login(email, password) {
    try {
      const response = await AuthService.login(email, password)
      console.log('Login response:', response)

      // Primeiro, busca os dados completos do usuário
      const userDataResponse = await AuthService.refreshDataUser(response.data.user.id)
      console.log('User data response:', userDataResponse)

      const userData = userDataResponse.data || response.data.user

      // Determina o tipo de usuário
      let userType = ''
      if (userData.driver_data) {
        userType = 'driver'
      } else if (userData.responsible_data) {
        userType = 'responsible'
      } else if (userData.passenger_data?.is_student) {
        userType = 'student'
      } else if (userData.passenger_data) {
        userType = 'passenger'
      }

      console.log('Determined user type:', userType)

      // Atualiza o state com todos os dados
      state.value = {
        ...state.value,
        token: response.data.access,
        isLogged: true,
        user: userData,
        type: userType,
        error: false,
        message: ''
      }

      console.log('State after update:', state.value)

      // Determina a rota baseado no tipo de usuário
      const routes = {
        driver: '/blank/profile/driver',
        responsible: '/blank/profile/responsible',
        student: '/blank/profile/student',
        passenger: '/blank/profile/passenger'
      }

      if (routes[userType]) {
        await router.push(routes[userType])
      } else {
        console.error('User type not determined:', userType)
      }

      showSuccessToast('Login realizado com sucesso!')
    } catch (error) {
      console.error('Login error:', error)
      state.value.error = true
      state.value.message = error.response?.data?.message || error.message || 'Erro ao fazer login'
      state.value.isLogged = false
      state.value.token = ''
      state.value.user = {}
      state.value.type = ''
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

  async function updatePicture(data, idRefresh) {
    try {
      const response = await AuthService.updatePicture(data)
      refreshDataUser(idRefresh)
      showSuccessToast('Foto atualizada com sucesso!')
      return response
    } catch (error) {
      state.error = true
      return error
    }
  }

  async function refreshDataUser(id) {
    try {
      const response = await AuthService.refreshDataUser(id)
      state.value.user = response.data
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async function logout() {
    // Limpa o state corretamente
    state.value = {
      user: {},
      isLogged: false,
      error: false,
      type: '',
      token: '',
      message: ''
    }

    // Limpa o storage
    if (storage) {
      storage.removeItem('auth')
    }

    console.log('State after logout:', state.value)

    // Redireciona para login
    await router.push('/blank/login')
  }

  return {
    state,
    login,
    logout,
    register,
    updatePicture,
    refreshDataUser,
  }
})
