import React from 'react'
import { Body, Sidebar, Main, Section } from '../layout/libs/container'
import Breadcrumb from '../breadcrumb'
import Pagination from '../pagination'
import Hot from './sidebar/hot'
import SearchTable from './table/index'
import { connect } from 'react-redux'
import { actionCreators } from './searchbar'

class Search extends React.Component {

  pathList = [
    {
      text: '首页',
      href: '/'
    }, {
      text: '搜索'
    }
  ]

  handlePageChange = pageCurrent => this.searchBt({ pageCurrent })

  searchBt = (options = {}) => this.props.dispatch(actionCreators.search(options))

  componentWillMount() {
    this.searchBt()
  }

  render() {
    return (
      <Body>
        <Sidebar>
          <Section>
            <Hot/>
          </Section>
        </Sidebar>
        <Main>
          <Section>
            <Breadcrumb pathList={ this.pathList } />
          </Section>
          <Section>
            <SearchTable />
          </Section>
          <Section>
            <Pagination dataSource={ this.props.search } onChange={ this.handlePageChange } />
          </Section>
        </Main>
      </Body>
    )
  }
}

export default connect( store => ({ search: store.bthh.search }) )(Search)