import { create } from 'zustand'

const currentUserStore = create((set, get) => {
    return {
        currentUser: null,
        setCurrentUser: newUser =>
            set(state => {
                return { currentUser: newUser }
            }),
    }
})

export default currentUserStore
