import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from './reducers';

const configureStore = () => {
  const middleware = [thunk];
  const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
  console.log('!!!!!!!!! NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default configureStore;
