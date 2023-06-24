import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/csr',
  component: Layout,
  redirect: '/csr/index',
  name: 'csr',
  meta: {
    title: '客户',
    icon: 'sidebar-breadcrumb',
  },
  children: [
    {
      path: 'open',
      name: 'csrOpen',
      component: () => import('@/views/csr/openCsr.vue'),
      meta: {
        title: '待开发客户',
      },
    },
    {
      path: 'doneDeal',
      name: 'csrDoneDeal',
      component: () => import('@/views/csr/doneDeal.vue'),
      meta: {
        title: '成交客户',
      },
    },
    {
      path: 'notDoneDeal',
      name: 'csrNotDoneDeal',
      component: () => import('@/views/csr/notDoneDeal.vue'),
      meta: {
        title: '询盘客户',
      },
    },
    {
      path: 'followUp',
      name: 'csrFollowUp',
      component: () => import('@/views/csr/followUp.vue'),
      meta: {
        title: '待回访',
      },
    },
    {
      path: 'save',
      name: 'csrSave',
      component: () => import('@/views/csr/save.vue'),
      meta: {
        title: '保存询盘客户',
      },
    },
    {
      path: 'saveDoneDeal',
      name: 'csrSaveDoneDeal',
      component: () => import('@/views/csr/saveDoneDeal.vue'),
      meta: {
        title: '保存成交客户',
      },
    },

  ],
}

export default routes
