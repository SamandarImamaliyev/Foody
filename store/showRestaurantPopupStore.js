import { create } from 'zustand'

const showRestaurantPopupStore = create((set, get) => {
  return {
    showRestaurantPopup: false,
    setShowRestaurantPopup: newValue =>
      set(state => {
        return { showRestaurantPopup: newValue }
      })
  }
})

export default showRestaurantPopupStore
