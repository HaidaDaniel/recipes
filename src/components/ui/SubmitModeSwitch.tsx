import * as Switch from '@radix-ui/react-switch'

export function SubmitModeSwitch({
  checked,
  onCheckedChange,
  title = 'Stay on page after submission',
}: {
  checked: boolean
  onCheckedChange: (val: boolean) => void
  title?: string
}) {
  return (
    <div className="flex items-center gap-4 ">
      <label htmlFor="submit-switch" className="text-sm font-medium">
        {title}
      </label>

      <Switch.Root
        id="submit-switch"
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-[#0090ff]"
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow absolute left-0.5 top-0.5 transition-transform data-[state=checked]:translate-x-5" />
      </Switch.Root>
    </div>
  )
}
