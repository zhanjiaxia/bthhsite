import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import dateformat from 'dateformat'

import './table.scss'

class SearchTable extends React.Component {

  texts = {
    magnet: text => <a href={text} target="_blank">下载</a>,
    create_at: text => dateformat(text, 'yyyy-mm-dd HH:MM:ss'),
    update_at: text => dateformat(text, 'yyyy-mm-dd HH:MM:ss')
  }

  renderThead = () => {
    const { fields, fieldLabels = {} } = this.props.bthh.search
    return (
      <thead>
        <tr>
          {
            fields.map(field => {
              const label = fieldLabels[field]
              return <th key={`search-table-th-${field}`} >{label}</th>
            })
          }
        </tr>
      </thead>
    )
  }

  renderNoData = () => <div style={{ textAlign: 'center', padding: '20px 0' }}>No Data!</div>

  renderTbody = () => {
    const { listData, listDataById, fields } = this.props.bthh.search
    return (
      <tbody>
        {
          listData.map(id => {
            const item = listDataById[id]
            return (
              <tr key={`search-table-tbody-tr-${id}`}>
                {
                  fields.map(field => {
                    const text = this.texts[field] ? this.texts[field](item[field], item) : item[field]
                    return <td key={Math.random().toString()}>{text}</td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    )
  }
  
  render() {
    return (
      <div>
        <Table className="search-table">
          { this.renderThead() }
          { this.renderTbody() }
        </Table>
        {
          (this.props.bthh.search.listData.length == 0)
            ? this.renderNoData()
            : ''
        }
      </div>
    )
  }
}

export default connect(store => ({ bthh: store.bthh }))(SearchTable)