import { create } from 'zustand'

const useDeleteModalStore = create((set, get) => {
    return {
        refresh: false,
        setRefresh: newValue =>
            set(state => {
                return { refresh: newValue }
            }),
    }
})

export default useDeleteModalStore