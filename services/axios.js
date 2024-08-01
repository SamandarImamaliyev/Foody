import axios from 'axios'

// const BASE_URL = 'https://foody-api.vercel.app/api'
const BASE_URL = 'http://localhost:3000/api'

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const getRestaurants = async () => {
  try {
    const response = await instanceAxios.get('/restuarants')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getRestaurantById = async id => {
  try {
    const response = await instanceAxios.get(`restuarants/${id}`)
    // const restaurant = response.data.result.data
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getCategories = async () => {
  try {
    const response = await instanceAxios.get('/category')
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getCategoryById = async id => {
  try {
    const response = await instanceAxios.get(`/category/${id}`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getOrders = async () => {
  try {
    const response = await instanceAxios.get(`/order`)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const loginUser = async (data) => {
  try {
    const response = await instanceAxios.post(`/auth/signin`, data);
    return response
  } catch (err) {
    console.log(err)
  }
}
