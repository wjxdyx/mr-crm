// 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    elementSize: 'default',
    iconifyOfflineUse: false,
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: true,
    routeBaseOn: 'frontend',
    enableAppSetting: true,
  },
  home: {
    enable: true,
    title: '主页',
  },
  layout: {
    enableMobileAdaptation: false,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'head',
    switchMainMenuAndPageJump: true,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  topbar: {
    mode: 'static',
  },
  toolbar: {
    enableFullscreen: false,
    enablePageReload: false,
    enableColorScheme: false,
  },
  breadcrumb: {
    enable: false,
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '2020-2023',
    company: 'Fantastic-admin',
    website: 'https://hooray.gitee.io/fantastic-admin/',
    beian: '',
  },
}
export default globalSettingsDefault
