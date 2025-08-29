import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import Layout from '@/components/Layout'
import GuestsIndex from './guests.index'
import GuestNew from './guests.new'
import GuestDetailRoute from './guests.$id'

export const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const guestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guests',
})

const guestsIndexRoute = createRoute({
  getParentRoute: () => guestsRoute,
  path: '/',
  component: GuestsIndex,
})

const guestsNewRoute = createRoute({
  getParentRoute: () => guestsRoute,
  path: '/new',
  component: GuestNew,
})

const guestDetailRoute = createRoute({
  getParentRoute: () => guestsRoute,
  path: '/$id',
  component: GuestDetailRoute,
})

const routeTree = rootRoute.addChildren([guestsRoute.addChildren([guestsIndexRoute, guestsNewRoute, guestDetailRoute])])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
