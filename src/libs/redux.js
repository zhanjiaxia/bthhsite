export const transform = {
  normal: (keyId = 'id') => json => {
    var data = initJson(json)
    json.results.forEach(item => {
      const id = item[keyId]
      item.id = id
      data.listData.push(id)
      data.listDataById[id] = item
    })
    return data
  }
}

function initJson({ size, count, from }) {
  return {
    count: count,
    pageSize: size,
    pageCurrent: (from / size) + 1,
    listData: [],
    listDataById: {}
  }
}

// 获取分页配置
export const paginationConfig = ({ pageCurrent = 1, pageSize }, state) => {
  pageSize = pageSize || state.pageSize
  return {
    pageSize,
    pageCurrent,
    query: {
      page_size: pageSize,
      page: pageCurrent
    },
    reducer: {
      pageSize,
      pageCurrent
    }
  }
}
