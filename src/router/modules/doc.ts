import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/doc',
  component: Layout,
  redirect: '/doc/index',
  name: 'doc',
  meta: {
    title: '文件',
    icon: 'sidebar-breadcrumb',
  },
  children: [

    {
      path: 'index2',
      name: 'docIndex2',
      component: () => import('@/views/doc/index2.vue'),
      meta: {
        title: '文件资料2',
      },
    },

  ],
}

export default routes
