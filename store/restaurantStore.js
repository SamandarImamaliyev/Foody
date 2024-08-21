import { create } from 'zustand'

const useRestaurantStore = create((set, get) => {
    return {
        restaurants: [],
        setRestaurants: newValue =>
            set(state => {
                return { restaurants: [...newValue] }
            }),
        // editData: null,
        // setEditData: newData =>
        //     set(state => {
        //         return { editData: newData }
        //     })
    }
})

export default useRestaurantStore