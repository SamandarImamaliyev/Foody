import { create } from 'zustand'

const showCategoryPopupStore = create((set, get) => {
  return {
    showCategoryPopup: false,
    setShowCategoryPopup: newValue =>
      set(state => {
        return { showCategoryPopup: newValue }
      })
  }
})

export default showCategoryPopupStore
