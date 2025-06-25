import { Dialog, Flex, Button } from '@radix-ui/themes'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type Filters = {
  search: string
  maxCookingTime: number | null
  minIngredients: number | null
}

type Props = {
  onChange: (filters: Filters) => void
}

export default function RecipesFilterModal({ onChange }: Props) {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset, getValues } = useForm<Filters>({
    defaultValues: {
      search: '',
      maxCookingTime: null,
      minIngredients: null,
    },
  })

  const onSubmit = (data: Filters) => {
    onChange({
      search: data.search,
      maxCookingTime: data.maxCookingTime,
      minIngredients: data.minIngredients,
    })
    setOpen(false)
  }

  const handleReset = () => {
    reset()
    const resetValues = getValues()
    onChange({
      search: resetValues.search,
      maxCookingTime: resetValues.maxCookingTime,
      minIngredients: resetValues.minIngredients,
    })
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="solid" color="blue">
          Filters
        </Button>
      </Dialog.Trigger>

      <Dialog.Content size="2">
        <Dialog.Title>Filter Recipes</Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3" mt="4">
            <input placeholder="Search..." {...register('search')} className="border rounded p-2" />
            <input
              type="number"
              placeholder="Max Cooking Time (minutes)"
              {...register('maxCookingTime', { valueAsNumber: true })}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Min Ingredients"
              {...register('minIngredients', { valueAsNumber: true })}
              className="border rounded p-2"
            />
          </Flex>

          <Flex justify="between" gap="3" mt="4">
            <Button type="button" variant="soft" color="yellow" onClick={handleReset}>
              Reset
            </Button>
            <Flex gap="3">
              <Button type="button" variant="soft" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="solid" color="green">
                Apply
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
