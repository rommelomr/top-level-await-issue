import {
  createRouter as createClientRouter,
  createWebHistory,
} from 'vue-router'
import * as NProgress from 'nprogress'

/**
 * routes are generated using vite-plugin-pages
 * each .vue files located in the ./src/pages are registered as a route
 * @see https://github.com/hannoeru/vite-plugin-pages
 */
import routes from 'pages-generated'
import { AuthRouter } from './modules/auth/router/AuthRouter'
import { useAuthStore } from './modules/auth/store/useAuthStore'
import { NotificationsRouter } from './modules/notifications/router/notificationsRouter'
import { VideRouter } from './modules/video/router/videoRouter'

/**
 * Here is how a simple route is generated:
 * import { RouteRecordRaw } from 'vue-router'
 *
 * const routes: RouteRecordRaw = [{
 *    component: () => import('/src/pages/wizard-1.vue'),
 *    name: 'wizard-v1',
 *    path: '/wizard-v1',
 *    props: true,
 *    meta: {
 *      requiresAuth: true
 *    },
 * }]
 *
 * Here is how nested routes are generated:
 * import { RouteRecordRaw } from 'vue-router'
 *
 * const routes: RouteRecordRaw = [{
 *    component: () => import('/src/pages/auth.vue'),
 *    path: '/auth',
 *    props: true,
 *    children: [
 *      {
 *        component: () => import('/src/pages/auth/login-1.vue'),
 *        name: 'auth-login-1',
 *        path: 'login-1',
 *        props: true
 *      },
 *    ],
 * }]
 *
 * Uncomment the line below to view the generated routes
 */


export function createRouter() {
  const router = createClientRouter({
    /**
     * If you need to serve vuero under a subdirectory,
     * you have to set the name of the directory in createWebHistory here
     * and update "base" config in vite.config.ts
     */
    // history: createWebHistory('my-subdirectory'),
    history: createWebHistory(),
    routes: [
      ...routes,
      ...AuthRouter,
      ...VideRouter,
      ...NotificationsRouter
    ],
  })

  /**
   * Handle NProgress display on page changes
   */
  router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const loggedIn = auth.user.isLogged === true
    const isAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (isAuth && !loggedIn) {

      return next({ path: '/login-page' })
    } else if (to.path == '/login-page' && loggedIn) {

      if (auth.user.usrole == 'STUDENTS' || auth.user.usrole == 'CLIENTS') {

        return next({ path: '/student/dashboard' })
      } else if (auth.user.usrole == 'auth.user.usrole') {
        return next({ path: '/admin/learning-paths' })

      }
    } else if (to.path == '/' && loggedIn) {
      if (import.meta.env.DEV) {
        return next()
      } else {
        if (auth.user.usrole == 'STUDENTS' || auth.user.usrole == 'CLIENTS') {
          return next({ path: '/student/dashboard' })
        } else if (auth.user.usrole == 'auth.user.usrole') {
          return next({ path: '/admin/learning-paths' })
        }
      }

    } else {
      next()
    }

    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  return router
}
