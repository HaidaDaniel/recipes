import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/ui/Loader'
import RecipesFilterModal, { type Filters } from '../components/RecipesFilterModal'
import { RecipesService } from '../api/generated'

export default function RecipeList() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    maxCookingTime: undefined,
    minIngredients: undefined,
  })

  const itemsPerPage = 10

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['recipes', filters],
      queryFn: ({ pageParam = 1 }) =>
        RecipesService.recipesControllerGetAllRecipes(
          pageParam,
          itemsPerPage,
          filters.search || undefined,
          filters.maxCookingTime,
          filters.minIngredients
        ),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < itemsPerPage ? undefined : allPages.length + 1,
      initialPageParam: 1,
    })

  const SCROLL_OFFSET = 200

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - SCROLL_OFFSET &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
      <RecipesFilterModal onChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {data?.pages.flat().map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

      {isFetchingNextPage && <Loader variant="inline" />}
      {isLoading && <Loader />}
      {isError && <div className="mt-6 text-center text-red-500">Error loading recipes.</div>}
    </>
  )
}
