import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/Button'
import { login as loginRequest } from '../api'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../context/AppContext'
import FormInput from '../components/ui/FormInput'
import { toast } from 'react-toastify'
import { authSchema, type AuthFormData } from '../types/forms/AuthFormData'

export default function Login() {
  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { login } = useAuth()

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.access_token)
      toast.success('Successfully logged in!')
      navigate({ to: '/' })
    },
    onError: (err: any) => {
      const message = err.response?.data?.message || 'Invalid credentials'
      setError(message)
      toast.error(message)
    },
  })

  const onSubmit = (data: AuthFormData) => {
    setError('')
    mutation.mutate({ email: data.username, password: data.password })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <FormInput name="username" label="Email" placeholder="Email" />
        <FormInput name="password" label="Password" type="password" placeholder="Password" />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </FormProvider>
  )
}
