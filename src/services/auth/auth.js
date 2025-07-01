import api from '@/plugins/axios'
import { showSuccessToast, showErrorToast } from '@/utils/toast'

class AuthService {
  async login(username, password) {
    try {
      const response = await api.post(`/authentication/token/`, {
        username,
        password,
      })
      return response
    } catch (error) {
      return error
    }
  }

  async registerDriver(data) {
    try {
      const response = await api.post(`/authentication/drivers/`, data)
      return response
    } catch (error) {
      return error
    }
  }

  async registerPassenger(data) {
    try {
      const response = await api.post(`/authentication/passengers/`, data)
      showSuccessToast('Cadastro realizado com sucesso!')
      return response
    } catch (error) {
      console.error(error)
      showErrorToast(error)
      return error
    }
  }

  async registerResponsible(data) {
    try {
      const response = await api.post(`/authentication/responsibles/`, data)
      return response
    } catch (error) {
      return error
    }
  }

  async updatePicture(data) {
    try {
      const response = await api.post(`/authentication/update-picture/`, data)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }
  async responsibleByStudentFilter(id){
    try {
      const response = await api.get(`/authentication/users/?responsible_id=${id}`)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async refreshDataUser(id){
    try {
      const response = await api.get(`/authentication/users/${id}/`)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

}

export default new AuthService()
