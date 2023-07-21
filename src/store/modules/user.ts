import md5 from 'js-md5'
import useRouteStore from './route'
import useMenuStore from './menu'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const auth_group = ref(localStorage.auth_group ?? '')
    const token = ref(localStorage.token ?? '')
    // const token = ref(localStorage.token ?? '')
    const failure_time = ref(localStorage.failure_time ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        // if (new Date().getTime() < parseInt(failure_time.value) * 1000) {
        //   retn = true
        // }
        retn = true
      }
      // console.log(retn, token.value, localStorage.token)

      return retn
    })

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const sData = {
        account: data.account,
        password: md5(data.password),
      }
      // 通过 mock 进行登录
      const res = await apiUser.login(sData)

      localStorage.setItem('account', res.data.nickname)
      localStorage.setItem('token', res.token)
      localStorage.setItem('auth_group', res.data.auth_group)

      // localStorage.setItem('failure_time', res.data.failure_time)
      account.value = res.data.account
      token.value = res.token
      auth_group.value = res.data.auth_group
      // failure_time.value = res.data.failure_time
    }
    // 登出
    async function logout() {
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      auth_group,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
