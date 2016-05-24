import React from 'react'
import { Button, Glyphicon, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import classnames from 'classnames'
import { connect } from 'react-redux'
import url from 'url'
import { transform, paginationConfig } from '../../libs/redux'

export const api = {
  search: '/api/bthh/search'
}

export const actionTypes = {
  REQUEST_BTHH_SEARCH: 'REQUEST_BTHH_SEARCH',
  RECEIVE_BTHH_SEARCH: 'RECEIVE_BTHH_SEARCH'
}

export const actionCreators = {
  search: options => (dispatch, getState) => {
    const content = options.content
    const searchState = getState().bthh.search
    const { content: contentState } = searchState
    const { pageSize, pageCurrent } = paginationConfig(options, searchState)
    const query = {
      size: pageSize,
      from: pageSize * (pageCurrent - 1)
    }
    if (content)
      query.content = content
    else if (contentState)
      query.content = contentState
    // TODO webpack dev server "proxy" not work, 使用 getState 获取 filter 存储的数据
    const fetchUrl = url.format({
      // protocol: 'http',
      // host: '0.0.0.0:3000',
      pathname: api.search,
      query
    })
    dispatch({ type: actionTypes.REQUEST_BTHH_SEARCH })
    return fetch(fetchUrl).then(res => res.json()).then(transform.normal('_id'))
      .then(payload => {
        if (content)
          payload.content = content
        dispatch({ type: actionTypes.RECEIVE_BTHH_SEARCH, payload })
      })
  }
}

class Searchbar extends React.Component {
  state = {
    value: '',
    isFocus: false
  }

  handleSearchContentChange = event => this.setState({ value: event.target.value })

  handleSearch = () => this.props.dispatch(actionCreators.search({ content: this.state.value }))

  handleSubmit = event => {
    event.preventDefault()
    this.handleSearch()
  }

  render() {
    const { isLoading } = this.props
    return (
      <Form onSubmit={ this.handleSubmit } { ...this.props }>
        <FormGroup>
          <InputGroup
            className={ classnames({ focus: this.state.isFocus }) }
            onFocus={ () => this.setState({ isFocus: true }) }
            onBlur={ () => this.setState({ isFocus: false }) }
          >
            <FormControl
              type="text"
              placeholder="Search"
              disabled={ isLoading }
              value={ this.state.value }
              onChange={ this.handleSearchContentChange }
            />
            <InputGroup.Button>
              <Button
                onClick={ isLoading ? null : this.handleSearch }
                disabled={ isLoading }
              ><Glyphicon glyph="search" /></Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Form>
    )
  }
}

export default connect(store => ({ bthh: store.bthh }))(Searchbar)
