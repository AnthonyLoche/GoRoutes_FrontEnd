import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores/auth/auth'

export const useDependentStore = defineStore('Dependent', () => {
  const authStore = useAuthStore()
  const state = reactive({
    cpf: '',
    is_student: true,
    user: {
      username: '',
      name: '',
      email: '',
      password: '',
      telephone: '',
      data_of_birth: '',
    },
    addresses: [
      {
        street: '',
        city: '',
        state: 'SC',
        neighborhood: '',
        number: null,
        cep: null,
        is_main: true,
      },
    ],
    student_data: {
      grade: '',
      registration: '',
      responsible: authStore.state.user.responsible_data.id,
    },
  })

  const registerDependent = async (data) => {
    try {
      const response = await AuthService.registerPassenger(data)
      return response
    } catch (error) {
      return error
    }
  }
  const responsibleByStudentFilter = async (id) => {
    try {
      const response = await AuthService.responsibleByStudentFilter(id)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  return {
    state,
    registerDependent,
    responsibleByStudentFilter,
  }
})
