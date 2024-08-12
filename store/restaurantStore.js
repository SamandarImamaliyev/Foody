import { create } from 'zustand'

const useRestaurantStore = create((set, get) => {
    return {
        restaurants: [],
        setRestaurants: newValue =>
            set(state => {
                return { restaurants: [...newValue] }
            }),
    }
})

export default useRestaurantStore