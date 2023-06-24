import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/homeMenu',
  component: Layout,
  redirect: '/homeMenu/index',
  name: 'homeMenu',
  meta: {
    title: '首页',
    icon: 'sidebar-breadcrumb',
  },
  children: [
    {
      path: 'index',
      name: 'HomeIndex',
      component: () => import('@/views/homeMenu/index.vue'),
      meta: {
        title: '首页',
        sidebar: false,
      },
    },

  ],
}

export default routes
