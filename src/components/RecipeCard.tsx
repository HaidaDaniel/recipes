import { HeartFilledIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { RecipesService, type OutputRecipeDto } from '../api/generated'
import { useAuth } from '../context/AppContext'

export default function RecipeCard({
  id,
  title,
  description,
  cookingTime,
  likeCount,
  ingredients,
  isLiked,
}: OutputRecipeDto) {
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [isBlocked, setIsBlocked] = useState(false)
  const ingredientsRef = useRef<HTMLDivElement>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) =>
      isLiked
        ? RecipesService.recipesControllerUnlikeRecipe(id)
        : RecipesService.recipesControllerLikeRecipe(id),
    onSuccess: async () => {
      toast.success('Like updated')
      await queryClient.invalidateQueries({ queryKey: ['recipes'] })
      setIsBlocked(false)
    },
    onError: () => {
      toast.error('Failed to update like')
      setIsBlocked(false)
    },
  })

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.info('Login to like recipes')
      return
    }
    if (isPending || isBlocked) {
      toast.info('Please wait...')
      return
    }

    setIsBlocked(true)
    mutate(id)
  }

  return (
    <div className="border border-gray-300 rounded-xl p-5 bg-white shadow hover:shadow-md transition-shadow h-[300px] flex flex-col justify-between">
      <div className="space-y-2 mb-4">
        <h2 className="font-semibold text-xl line-clamp-1">{title}</h2>
        <p className="text-gray-600 text-base line-clamp-2">{description}</p>
      </div>

      <div className="mt-auto space-y-3 text-sm">
        <div className="text-gray-500 flex items-start gap-1">
          <strong>Ingredients:</strong>
          <div className="flex-1">
            <div ref={ingredientsRef} className="flex flex-wrap gap-1 max-h-[3em] overflow-hidden">
              {ingredients.map((item, i) => (
                <span key={i} className="bg-yellow-100 px-2 py-0.5 rounded text-xs text-gray-800">
                  {item}
                </span>
              ))}
            </div>
            <div className="w-full h-4 bg-gradient-to-t from-white via-white to-transparent -mt-4" />
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-500">
          <span className="flex items-center gap-1">
            <span>⏱</span> {cookingTime} min
          </span>
          <button
            onClick={handleLike}
            disabled={!isAuthenticated || isPending || isBlocked}
            className={`flex items-center gap-1 transition-opacity ${
              isLiked ? 'text-red-600' : 'text-red-500'
            } ${
              !isAuthenticated || isPending || isBlocked
                ? 'cursor-default opacity-60'
                : 'hover:text-red-600'
            }`}
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
            ) : (
              <HeartFilledIcon className="w-4 h-4" />
            )}
            {likeCount}
          </button>
        </div>
      </div>
    </div>
  )
}
