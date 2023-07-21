import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/oa',
  component: Layout,
  redirect: '/oa/followUp',
  name: 'oa',
  meta: {
    title: '审批',
    icon: 'sidebar-breadcrumb',

  },
  children: [

    {
      path: 'followUp',
      name: 'oaFollowUp',
      component: () => import('@/views/oa/followUp.vue'),
      meta: {
        title: '回访审批',
        sidebar: false,
      },
    },

  ],
}

export default routes
