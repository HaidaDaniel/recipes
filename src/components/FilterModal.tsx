import * as Dialog from '@radix-ui/react-dialog'

import { Button } from './ui/Button'
import Input from './ui/FormInput'

export default function FilterModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Filters</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded shadow transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-4">Filter Recipes</Dialog.Title>
          <form className="space-y-4">
            <Input name="query" placeholder="Search..." />
            <Input name="maxTime" type="number" placeholder="Max Cooking Time" />
            <Input name="minIngredients" type="number" placeholder="Min Ingredients" />
            <div className="flex justify-end">
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
