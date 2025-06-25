import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { AuthService } from '@/services'

export const useDependentStore = defineStore('Dependent', () => {
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
      responsible: 1,
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

  return {
    state,
    registerDependent,
  }
})
