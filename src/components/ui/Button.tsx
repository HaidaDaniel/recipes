import { Button as RadixButton } from '@radix-ui/themes'

export type ButtonProps = React.ComponentProps<typeof RadixButton>

export function Button(props: ButtonProps) {
  return <RadixButton {...props} />
}
