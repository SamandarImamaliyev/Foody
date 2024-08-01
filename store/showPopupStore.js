import { create } from 'zustand'

const useShowPopupStore = create((set, get) => {
  return {
    showPopup: false,
    setShowPopup: newValue =>
      set(state => {
        return { showPopup: newValue }
      })
  }
})

export default useShowPopupStore
