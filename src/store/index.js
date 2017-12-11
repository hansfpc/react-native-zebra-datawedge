import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'

import Reducers from  '../reducers'

const middleware = () => {
  return applyMiddleware(logger)
};

export default createStore(Reducers, middleware())