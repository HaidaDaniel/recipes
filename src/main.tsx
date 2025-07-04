import { Theme } from '@radix-ui/themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './context/AppContext'
import { queryClient } from './lib/queryClient'
import { router } from './router'

import './index.css'
import '@radix-ui/themes/styles.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          <RouterProvider router={router} />
        </Theme>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
