import { create } from 'zustand'
// import { getCategories, getRestaurants } from '../services/axios'

const useImageStore = create((set, get) => {
    return {
        imageUrl: null,
        image: null,
        file: null,
        setImageUrl: newUrl =>
            set(state => {
                return { imageUrl: newUrl }
            }),
        setImage: newImage =>
            set(state => {
                return { image: newImage }
            }),
        setFile: newFile =>
            set(state => {
                return { file: newFile }
            })
    }
})

export default useImageStore