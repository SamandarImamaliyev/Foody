import { create } from "zustand";


const useUrlStore = create((set, get) => {
    return {
        url: "/",
        setUrl: newValue =>
            set(state => {
                return { url: newValue }
            }),
    }
})

export default useUrlStore