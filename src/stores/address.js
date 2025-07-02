import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AddressService } from '@/services'

export const useAddressStore = defineStore('address', () => {
  const state = useStorage('address', {
    address: {},
  })

  const getAddressByCep = async (cep) => {
    const response = await AddressService.getAddressByCep(cep)
    return response
  }

  return {
    state,
    getAddressByCep,
  }
})