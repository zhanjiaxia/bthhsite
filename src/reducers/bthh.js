import extend from 'extend'
import initialState from '../store/initial'
import { actionTypes as hotType } from '../components/search/sidebar/hot'
import { actionTypes as searchType } from '../components/search/searchbar'

export default function bthh(state = initialState.bthh, action) {
  switch (action.type) {
    case hotType.REQUEST_BTHH_HOT:
      return extend(true, {}, state, { hot: { isFetching: true }})
    case hotType.RECEIVE_BTHH_HOT:
      return {
        ...state,
        hot: {
          ...state.hot,
          ...action.payload,
          isFetching: false
        }
      }
    case searchType.REQUEST_BTHH_SEARCH:
      return extend(true, {}, state, { search: { isFetching: true }})
    case searchType.RECEIVE_BTHH_SEARCH:
      return {
        ...state,
        search: {
          ...state.search,
          ...action.payload,
          isFetching: false
        }
      }
    default:
      return state
  }
}
