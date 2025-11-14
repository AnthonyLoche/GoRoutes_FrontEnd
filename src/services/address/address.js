import axios from 'axios'


class AddressService {
  async getAddressByCep(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response.data
  }
}

export default new AddressService()