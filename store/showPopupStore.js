import { create } from 'zustand'

const useShowPopupStore = create((set, get) => {
  return {
    showPopup: false,
    setShowPopup: newValue =>
      set(state => {
        return { showPopup: newValue }
      }),

    showSidebarModal: false,
    setShowSidebarModal: newValue =>
      set(state => {
        return { showSidebarModal: newValue }
      })
  }
})

export default useShowPopupStore
