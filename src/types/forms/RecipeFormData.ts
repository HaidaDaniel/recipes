import { z } from 'zod'

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  cookingTime: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(1, 'Cooking time must be at least 1 minute'),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1, 'Ingredient cannot be empty'),
      })
    )
    .min(1, 'At least one ingredient is required'),
})

export type RecipeFormData = z.infer<typeof recipeSchema>
