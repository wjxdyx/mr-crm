import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: '权限',
    icon: 'sidebar-breadcrumb',

  },
  children: [
    {
      path: 'index',
      name: 'userIndex',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '员工',

      },
    },

  ],
}

export default routes
