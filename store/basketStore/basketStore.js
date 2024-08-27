import { create } from "zustand";
import { getBasket } from "../../services/axios";


const useBasketStore = create((set, get) => {
    return {
        basket: null,
        setBasket: newValue =>
            set(state => {
                return { basket: newValue }
            }),
        getBasketState: async () => {
            try {
                const response = await getBasket()
                get().setBasket(response?.data.result.data)
            } catch (err) {
                console.error(err)
            }
        },
    }
})

export default useBasketStore