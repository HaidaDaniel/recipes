export type Recipe = {
  id: number
  title: string
  description: string
  cookingTime: number
  likeCount: number
  isLiked: boolean
  ingredients: string[]
}

export type SendedRecipe = {
  title: string
  description: string
  cookingTime: number
  ingredients: string[]
}
