import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AuthService } from '../api/generated'
import { Button } from '../components/ui/Button'
import FormInput from '../components/ui/FormInput'
import { ROUTES } from '../router'
import { authSchema, type AuthFormData } from '../types/forms/AuthFormData'

export default function SignUp() {
  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const mutation = useMutation({
    mutationFn: AuthService.authControllerRegister,
    onSuccess: () => {
      toast.success('Account created successfully!')
      navigate({ to: ROUTES.login })
    },
    onError: (error: Error & { body?: { message?: string } }) => {
      const msg = error?.body?.message || 'Registration failed'
      setErrorMessage(msg)
      toast.error(msg)
    },
  })

  const onSubmit = (data: AuthFormData) => {
    setErrorMessage('')
    mutation.mutate({ email: data.username, password: data.password })
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput name="username" label="Email" placeholder="Email" />
          <FormInput name="password" label="Password" type="password" placeholder="Password" />
          {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </FormProvider>
  )
}
