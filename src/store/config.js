import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import resetMiddleware from 'redux-reset'
import rootReducer from '../reducers/index'

export default function configureStore(initialState = {}) {
  
  let enhancer
  const middleware = applyMiddleware(
    thunkMiddleware
  )

  if (process.env.NODE_DEV !== 'production') {
    enhancer = compose(middleware, resetMiddleware())
  } else {
    enhancer = compose(middleware)
  }
  
  const store = createStore(rootReducer, initialState, enhancer)
  
  // 开启 Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index').default)
    );
  }
  
  return store
};

