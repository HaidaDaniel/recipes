import { Router, createRootRoute, createRoute, lazyRouteComponent } from '@tanstack/react-router'
import MainLayout from './layout/MainLayout'
import ProtectedRoute from './lib/ProtectedRoute'

const rootRoute = createRootRoute({
  component: MainLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./pages/Home')),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazyRouteComponent(() => import('./pages/Login')),
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: lazyRouteComponent(() => import('./pages/SignUp')),
})

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedRoute,
})

const addRecipeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/add-recipe',
  component: lazyRouteComponent(() => import('./pages/AddRecipe')),
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signUpRoute,
  protectedRoute.addChildren([addRecipeRoute]),
])

export const router = new Router({ routeTree })
