import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AddressService } from '@/services'

export const useAddressStore = defineStore('address', () => {
  const state = useStorage('address', {
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    number: '',
    complemento: '',
    unidade: '',
    estado: '',
    regiao: '',
    ibge: '',
    gia: '',
    ddd: '',
    siafi: '',
  })

  const getAddressByCep = async (cep) => {
    const response = await AddressService.getAddressByCep(cep)
    console.log(response)
    state.value.cep = response?.cep
    state.value.logradouro = response?.logradouro
    state.value.bairro = response?.bairro
    state.value.localidade = response?.localidade
    state.value.uf = response?.uf
    state.value.number = response?.number
    state.value.complemento = response?.complemento
    state.value.unidade = response?.unidade
    state.value.estado = response?.estado
    state.value.regiao = response?.regiao
    state.value.ibge = response?.ibge
    state.value.gia = response?.gia
    state.value.ddd = response?.ddd
    state.value.siafi = response?.siafi

    return response
  }

  const getAddresRequest = () => {
    const address = {
      street: state.value.logradouro,
        city: state.value.localidade,
        state: state.value.uf,
        neighborhood: state.value.bairro,
        number: state.value.number,
        cep: state.value.cep,
    }
    return address
  }

  return {
    state,
    getAddressByCep,
    getAddresRequest,
  }
})
