import { Spinner } from '@radix-ui/themes'

interface LoaderProps {
  variant?: 'block' | 'inline'
}

export default function Loader({ variant = 'block' }: LoaderProps) {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
        <Spinner size="1" /> Loading...
      </span>
    )
  }

  return (
    <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
      <Spinner size="3" />
    </div>
  )
}
