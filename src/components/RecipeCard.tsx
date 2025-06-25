import { HeartFilledIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@radix-ui/react-tooltip'
import type { Recipe } from '../types'
import { useRef, useEffect, useState } from 'react'
import { useAuth } from '../context/AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeRecipe, unlikeRecipe } from '../api'
import { toast } from 'react-toastify'

export default function RecipeCard({
  id,
  title,
  description,
  cookingTime,
  likeCount,
  ingredients,
  isLiked,
}: Recipe) {
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [showTooltip, setShowTooltip] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const ingredientsRef = useRef<HTMLSpanElement>(null)

  const fullList = ingredients.join(', ')

  useEffect(() => {
    if (ingredientsRef.current) {
      const el = ingredientsRef.current
      setShowTooltip(el.scrollHeight > el.clientHeight)
    }
  }, [ingredients])

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => (isLiked ? unlikeRecipe(id) : likeRecipe(id)),
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
    <div className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition-shadow h-[300px] flex flex-col justify-between">
      <div className="space-y-2 mb-4">
        <h2 className="font-semibold text-xl line-clamp-1">{title}</h2>
        <p className="text-gray-600 text-base line-clamp-2">{description}</p>
      </div>

      <div className="mt-auto space-y-3 text-sm">
        <div className="text-gray-500 flex items-start gap-1">
          <strong>Ingredients:</strong>
          <div className="flex-1 relative">
            <span
              ref={ingredientsRef}
              className="line-clamp-2 block break-words max-h-[3em] overflow-hidden"
            >
              {ingredients.join(', ')}
            </span>
            {showTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircledIcon className="inline-block w-4 h-4 text-gray-400 ml-1 cursor-help absolute -right-5 top-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm text-xs bg-white border p-2 rounded shadow">
                    {fullList}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
            } ${!isAuthenticated || isPending || isBlocked ? 'cursor-default opacity-60' : 'hover:text-red-600'}`}
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
