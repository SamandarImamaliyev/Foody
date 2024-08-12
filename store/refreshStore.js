import { create } from 'zustand'

const useRefreshStore = create((set, get) => {
    return {
        refresh: false,
        setRefresh: newValue =>
            set(state => {
                return { refresh: newValue }
            }),
    }
})

export default useRefreshStore