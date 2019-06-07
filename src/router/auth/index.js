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
      },
      {
        name: 'passwordReset',
        path: '/password/reset/:token',
        component: () => import('../../views/auth/PasswordReset')
      }
    ]
  }
]
export default authRouter
