
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/auth2.vue') },
      // { path: '/login', component: () => import('pages/.vue') },
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/list', component: () => import('pages/list.vue') },
      { path: '/result', component: () => import('pages/Profile.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
