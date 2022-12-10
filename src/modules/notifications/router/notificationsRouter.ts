export const NotificationsRouter = [
  {
    path: '/notifications',
    name: 'notifications',
    //@ts-ignore
    component: () => import('../pages/index.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/users/details:id',
  //   name: 'users-details',
  //   //@ts-ignore
  //   component: () => import('../components/details/userDetails.vue'),
  // },
]
