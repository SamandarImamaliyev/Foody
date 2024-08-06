import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api';
let adminToken;

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
    return response
  } catch (error) {
    console.log(error)
  }
}

export const addRestaurantToDB = async (data) => {
  try {
    const response = await instanceAxios.post(`/restuarants`, data);
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteRestaurantById = async (id) => {
  try {
    const response = await instanceAxios.delete(`/restuarants/${id}`)
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

export async function deleteCategoryById(id) {
  try {
    // let item = localStorage.getItem('userInfo')
    // let accessToken = JSON.parse(item)
    // const token = accessToken.access_token
    const response = await instanceAxios.delete(`/category/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postCategory = async (data) => {
  try {
    const response = await instanceAxios.post('/category', data)
    return response
  } catch (err) {
    console.log(err)
  }
}


export const getOrders = async () => {
  try {
    const response = await instanceAxios.get(`/order`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteOrderFromDB(data) {
  try {
    const response = await instanceAxios.delete(`/order`, data)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const loginUser = async (data) => {
  try {
    const response = await instanceAxios.post(`/auth/signin`, data);
    adminToken = response.data.user.access_token;
    return response
  } catch (err) {
    console.log(err)
  }
}

export const addProductToDB = async (data) => {
  try {
    const response = await instanceAxios.post(`/products`, data);
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getProductsFromDB = async () => {
  try {
    const response = await instanceAxios.get('/products')
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteProductById(id) {
  try {
    // let item = localStorage.getItem('userInfo')
    // let accessToken = JSON.parse(item)
    // const token = accessToken.access_token
    const response = await instanceAxios.delete(`/products/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postOffer = async (data) => {
  try {
    const response = await instanceAxios.post('/offer', data)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getOffersFromDB = async () => {
  try {
    const response = await instanceAxios.get('/offer')
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function deleteOfferById(id) {
  try {
    const response = await instanceAxios.delete(`/offer/${id}`, {
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
