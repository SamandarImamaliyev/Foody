import { create } from 'zustand'

const useShowPopupStore = create((set, get) => {
  return {
    showPopup: false,
    showEditProductPopup: false,
    setShowPopup: newValue =>
      set(state => {
        return { showPopup: newValue }
      }),

    showSidebarModal: false,
    setShowSidebarModal: newValue =>
      set(state => {
        return { showSidebarModal: newValue }
      }),
    setShowEditProductPopup: newValue =>
      set(state => {
        return { showEditProductPopup: newValue }
      })
  }
})

export default useShowPopupStore
