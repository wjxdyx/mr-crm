// 文件目录信息
interface docFileLink {
  name: string
  oldName?: string
  imgUrl?: string
  typ?: string
  is_folder?: boolean
  is_file?: boolean
  breadcrumb?: string[]
  children?: docFileLink[]

}
interface docFileActive {
  [key: string]: docFileLink
}
