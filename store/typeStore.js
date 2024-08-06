import { create } from 'zustand'
import { getCategories, getOffersFromDB, getOrders, getRestaurants } from '../services/axios'

const useTypeStore = create((set, get) => {
  return {
    states: [],
    setState: newState =>
      set(state => {
        return { states: [...newState] }
      }),
    getCategoryState: async () => {
      try {
        const response = await getCategories()
        get().setState(response.data.result.data)
      } catch (err) {
        console.error(err)
      }
    },
    getRestaurantState: async () => {
      try {
        const response = await getRestaurants()
        get().setState(response.data.result.data)
      } catch (err) {
        console.error(err)
      }
    },
    getOffersState: async () => {
      try {
        const response = await getOffersFromDB()
        get().setState(response.data.result.data)
      } catch (err) {
        console.error(err)
      }
    },
    getOrdersState: async () => {
      try {
        const response = await getOrders()
        get().setState(response.data.result.data)
      } catch (err) {
        console.error(err)
      }
    },

    stateName: '',
    setStateName: newName =>
      set(state => {
        return { stateName: newName }
      })
  }
})

export default useTypeStore
