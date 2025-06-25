import { Label as RadixLabel } from '@radix-ui/react-label'

export default function Label(props: React.ComponentProps<typeof RadixLabel>) {
  return <RadixLabel className="text-sm font-medium" {...props} />
}
