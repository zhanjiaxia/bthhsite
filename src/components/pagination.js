import React from 'react'
import { Pagination as BsPagination } from 'react-bootstrap'

class Pagination extends React.Component {
  render() {
    const { onChange, dataSource } = this.props
    const { count, pageSize, pageCurrent, listData } = dataSource
    const items = Math.ceil(count / pageSize)
    return (
      <BsPagination
        style={{ float: 'right', display: listData.length ? 'block' : 'none' }}
        prev
        next
        ellipsis
        boundaryLinks
        bsSize="small"
        items={ items }
        activePage={ pageCurrent }
        maxButtons={ 7 }
        onSelect={ onChange }
      />
    )
  }
}

export default Pagination