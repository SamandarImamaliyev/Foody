import { create } from 'zustand'
import { getCategories, getRestaurants } from '../services/axios'

const useCurrentPageStore = create((set, get) => {
  return {
    currentPage: 1,
    setCurrentPage: newPage =>
      set(state => {
        return { currentPage: newPage }
      })
  }
})

export default useCurrentPageStore
