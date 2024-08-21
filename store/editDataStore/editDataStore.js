import { create } from 'zustand'

const useEditDataStore = create((set, get) => {
    return {
        editData: null,
        setEditData: newData =>
            set(state => {
                return { editData: newData }
            })
    }
})

export default useEditDataStore