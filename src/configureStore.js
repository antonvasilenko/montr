import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules';

const configureStore = () => {
  const middleware = [thunk];
  const composeEnhancers = composeWithDevTools({ realtime: true, port: 8097 });
  console.log('!!!!!!!!! NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  // https://github.com/jhen0409/react-native-debugger#inpsect-network-requests-by-network-tab-of-chrome-devtools-see-also-15
  const xhr = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest : global.XMLHttpRequest;
  global.XMLHttpRequest = xhr;

  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default configureStore;
