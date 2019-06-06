const authRouter = [
  {
    path: '/test',
    component: () => import('../../views/auth/Layout'),
    meta: { auth: false },
    redirect: '/login',
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('../../views/auth/Login')
      },
      {
        name: 'sendResetEmail',
        path: '/password/forgot',
        component: () => import('../../views/auth/SendResetEmail')
      }
    ]
  }
]
export default authRouter
