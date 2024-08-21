import { create } from 'zustand'

const showRestaurantPopupStore = create((set, get) => {
  return {
    showRestaurantPopup: false,
    showEditRestaurantPopup: false,
    setShowRestaurantPopup: newValue =>
      set(state => {
        return { showRestaurantPopup: newValue }
      }),
    setShowEditRestaurantPopup: newValue =>
      set(state => {
        return { showEditRestaurantPopup: newValue }
      })
  }
})

export default showRestaurantPopupStore
