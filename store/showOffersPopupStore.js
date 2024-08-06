import { create } from 'zustand'

const useShowOffersPopupStore = create((set, get) => {
  return {
    showOffersPopup: false,
    setShowOffersPopup: newValue =>
      set(state => {
        return { showOffersPopup: newValue }
      }),

  }
})

export default useShowOffersPopupStore
