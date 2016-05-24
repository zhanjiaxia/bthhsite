import React from 'react'
import { connect } from 'react-redux'
import url from 'url'
import { transform } from '../../../libs/redux'
import { Nav, NavItem } from 'react-bootstrap'

import './hot.scss'

export const api = {
  hot: '/api/bthh/search'
}

export const actionTypes = {
  REQUEST_BTHH_HOT: 'REQUEST_BTHH_HOT',
  RECEIVE_BTHH_HOT: 'RECEIVE_BTHH_HOT'
}

export const actionCreators = {
  fetchHot: () => dispatch => {
    dispatch({ type: actionTypes.RECEIVE_BTHH_HOT })
    // TODO webpack dev server "proxy" not work
    const fetchUrl = url.format({
      // protocol: 'http',
      // host: '0.0.0.0:3000',
      pathname: api.hot,
      query: {
        sort: JSON.stringify({ hot: -1 })
      }
    })
    return fetch(fetchUrl).then(res => res.json()).then(transform.normal('_id')).then(listData => {
      dispatch({ type: actionTypes.RECEIVE_BTHH_HOT, payload: listData })
    })
  }
}

class Hot extends React.Component {

  componentWillMount() {
    this.props.dispatch(actionCreators.fetchHot())
  }

  renderNavItems = () => {
    const { listData, listDataById } = this.props.bthh.hot
    return listData.map(itemId => {
      const { name, magnet, hot } = listDataById[itemId]
      const title = `${name} - ${hot}`
      return (
        <NavItem eventKey={ itemId } key={ itemId } href={ magnet } title={ title }>
          { title }
        </NavItem>
      )
    })
  }

  render() {
    return (
      <Nav
        bsStyle="pills"
        stacked
        activeKey="hot-title"
        className="bthh-hot"
      >
        <NavItem eventKey="hot-title">Hot</NavItem>
        { this.renderNavItems() }
      </Nav>
    )
  }
}

export default connect(store => ({ bthh: store.bthh }))(Hot)