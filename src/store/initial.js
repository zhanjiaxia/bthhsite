// 也代表顺序
const btFields = [
  'name',
  'magnet',
  'hot',
  'create_at',
  'update_at'
]

const btFieldLabels = {
  name: '名称',
  magnet: '磁力链接',
  hot: '资源热度',
  create_at: '创建时间',
  update_at: '最后下载时间'
}

export default {
  bthh: {
    hot: {
      isFetching: false,
      listData: [],
      listDataById: {},
      pageSize: 10
    },
    search: {
      isFetching: false,
      listData: [],
      listDataById: {},
      fields: [...btFields],
      fieldLabels: { ...btFieldLabels },
      pageCurrent: 1,
      pageSize: 15,
      count: 0
    }
  }
}