export const UsersRouter = [
  {
    path: '/admin/users',
    name: 'admin_users',
    //@ts-ignore
    component: () => import('../pages/index.vue'),
  },
  // {
  //   path: '/users/details:id',
  //   name: 'users-details',
  //   //@ts-ignore
  //   component: () => import('../components/details/userDetails.vue'),
  // },
]
