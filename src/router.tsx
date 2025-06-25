import { Router, createRootRoute, createRoute, lazyRouteComponent } from '@tanstack/react-router'

import MainLayout from './layout/MainLayout'
import ProtectedRoute from './lib/ProtectedRoute'

export const ROUTES = {
  home: '/' as const,
  login: '/login' as const,
  signup: '/signup' as const,
  addRecipe: '/add-recipe' as const,
}

const rootRoute = createRootRoute({
  component: MainLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home,
  component: lazyRouteComponent(() => import('./pages/Home')),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.login,
  component: lazyRouteComponent(() => import('./pages/Login')),
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.signup,
  component: lazyRouteComponent(() => import('./pages/SignUp')),
})

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedRoute,
})

const addRecipeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: ROUTES.addRecipe,
  component: lazyRouteComponent(() => import('./pages/AddRecipe')),
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signUpRoute,
  protectedRoute.addChildren([addRecipeRoute]),
])

export const router = new Router({ routeTree })
