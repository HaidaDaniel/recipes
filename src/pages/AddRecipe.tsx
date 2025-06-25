import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'

import { RecipesService } from '../api/generated'
import { Button } from '../components/ui/Button'
import FormInput from '../components/ui/FormInput'
import { SubmitModeSwitch } from '../components/ui/SubmitModeSwitch'
import { queryClient } from '../lib/queryClient'
import { ROUTES } from '../router'
import { recipeSchema, type RecipeFormData } from '../types/forms/RecipeFormData'

export default function AddRecipe() {
  const navigate = useNavigate()
  const [stayAfterSubmit, setStayAfterSubmit] = useState(true)

  const methods = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      cookingTime: 0,
      ingredients: [{ value: '' }],
    },
  })

  const { handleSubmit, reset, control } = methods

  const { fields, append } = useFieldArray({ control, name: 'ingredients' })

  const mutation = useMutation({
    mutationFn: RecipesService.recipesControllerCreateRecipe,
    onSuccess: () => {
      toast.success('Recipe created successfully!')
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      if (stayAfterSubmit) {
        reset()
      } else {
        navigate({ to: ROUTES.home })
      }
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to create recipe')
    },
  })

  const onSubmit = (data: RecipeFormData) => {
    mutation.mutate({
      title: data.title,
      description: data.description,
      cookingTime: data.cookingTime,
      ingredients: data.ingredients.map((i) => i.value),
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-xl border shadow-md"
        >
          <div>
            <FormInput name="title" placeholder="Title" />
          </div>

          <div>
            <FormInput name="description" placeholder="Description" />
          </div>

          <div>
            <FormInput name="cookingTime" placeholder="Cooking Time (min)" type="number" />
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormInput
                  name={`ingredients.${index}.value`}
                  placeholder={`Ingredient ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between ">
            <Button type="button" onClick={() => append({ value: '' })} color="blue">
              + Add another ingredient
            </Button>

            <SubmitModeSwitch checked={stayAfterSubmit} onCheckedChange={setStayAfterSubmit} />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Submitting...' : 'Submit Recipe'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
