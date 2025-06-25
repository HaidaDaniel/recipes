import axios from 'axios'
import type { Recipe, SendedRecipe } from '../types'
import { callLogout } from '../context/AppContext'

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      callLogout()
    }
    return Promise.reject(error)
  }
)

export const getRecipes = async (params?: {
  page?: number
  limit?: number
  search?: string
  maxCookingTime?: number
  minIngredients?: number
}): Promise<Recipe[]> => {
  const { data } = await api.get('/recipes', { params })
  return data
}

export const createRecipe = async (payload: SendedRecipe) => {
  const { data } = await api.post('/recipes', payload)
  return data
}

export const likeRecipe = async (id: number) => {
  const { data } = await api.patch(`/recipes/${id}/like`)
  return data
}

export const unlikeRecipe = async (id: number) => {
  const { data } = await api.delete(`/recipes/${id}/like`)
  return data
}

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', payload)
  return data
}

export const register = async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}
