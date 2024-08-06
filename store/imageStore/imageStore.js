import { create } from 'zustand'
// import { getCategories, getRestaurants } from '../services/axios'

const useImageStore = create((set, get) => {
    return {
        imageUrl: null,
        setImageUrl: newUrl =>
            set(state => {
                return { imageUrl: newUrl }
            }),
    }
})

export default useImageStore