import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useFormContext, get, type RegisterOptions } from 'react-hook-form'

import { sanitizeRulesForNumberInput } from '../../lib/utils'

interface FormInputProps extends ComponentPropsWithoutRef<'input'> {
  name: string
  label?: string
  icon?: ReactNode
  type?: 'text' | 'email' | 'password' | 'number'
  rules?: RegisterOptions
}

export default function FormInput({
  name,
  label,
  icon,
  type = 'text',
  rules = {},
  ...rest
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = get(errors, name)

  const registerOptions = type === 'number' ? sanitizeRulesForNumberInput(rules) : rules

  const registerProps = register(name, registerOptions)

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 block">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          type={type}
          {...registerProps}
          {...rest}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm placeholder-gray-400
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : ''}
          `}
        />
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {(error as { message?: string })?.message || 'Invalid input'}
        </div>
      )}
    </div>
  )
}
