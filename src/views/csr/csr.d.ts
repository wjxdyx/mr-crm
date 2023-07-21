interface docFromType {
  name: string
  doc_from_id: number
}
interface csrQueryFormType {
  from?: string
  name?: string
  phone?: string
  create_time?: any
  order?: any
  query_time?: any

  index?: number
  limit?: number
}
interface csrData {
  csr_name?: string
  phone?: string
  create_time?: any

  crm_csr_id?: number
}
interface pageInfoType {
  doc_from?: {
    option: docFromType[]
  }
  doc_from_id?: string
  queryForm: csrQueryFormType
  csrView: {
    drawer: boolean
    rowData: csrData
  }
}
interface pageType {
  doc_from: {
    option: docFromType[]
  }
  queryForm?: csrQueryFormType

}
interface proTable {
  pro_name?: string
  pro_id?: number
  amount?: number
  tpy?: string
  mark?: string
}
interface formProItem {
  name: string
  typ: string
  num: number
  amt: number
  mark: string
}
interface csrSave {
  name: string

  mark: string
  ws_step: string | undefined
  crm_csr_id?: number | undefined
  from: string
  code: string
  mark?: string
  amt?: number | undefined
  phone: string
  address?: string | undefined
  pro?: formProItem[]
  contract: string[]

}

// 客户跟踪事件记录
interface csrTimeLine {
  create_time?: string
  order_id?: number
  order_no?: string
  mark?: string
  order_pro?: string
  contract?: string[]
  track_prove?: string[]
}
