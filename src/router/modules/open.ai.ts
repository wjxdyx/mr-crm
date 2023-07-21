import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ai',
  component: Layout,
  redirect: '/ai/openai',
  name: 'ai',
  meta: {
    title: 'AI',
    icon: 'sidebar-breadcrumb',

  },
  children: [

    {
      path: 'openai',
      name: 'aiOpenai',
      component: () => import('@/views/ai/openai.vue'),
      meta: {
        title: 'openai',
        sidebar: false,
      },
    },

  ],
}

export default routes
