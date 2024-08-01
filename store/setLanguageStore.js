import { create } from 'zustand'
import i18next from 'i18next'

const useSetLanguageStore = create((set, get) => {
    return {
        change: 1,
        setLanguage: newValue => {
            set(state => {
                return { change: newValue }
            })
        },
        changeLanguageMethod: () => {
            if (get().change === 1) {
                i18next.changeLanguage("en")
            } else if (get().change === 2) {
                i18next.changeLanguage("az")
            }
        }
    }
})

export default useSetLanguageStore