export const AuthRouter = [
  {
    path: '/login-page',
    name: 'login',
    meta: { requiresAuth: false },
    //@ts-ignore
    component: () => import('../pages/login-page.vue'),
  },
  {
    path: '/signup-page',
    name: 'signup',
    meta: { requiresAuth: false },
    //@ts-ignore
    component: () => import('../pages/signup-page.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true },
    //@ts-ignore
    component: () => import('../pages/home.vue'),
  },

  // {
  //   path: '/users/details:id',
  //   name: 'users-details',
  //   //@ts-ignore
  //   component: () => import('../components/details/userDetails.vue'),
  // },
]
