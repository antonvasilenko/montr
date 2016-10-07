/**
 * @flow
 */
import { AppRegistry } from 'react-native';
import AppPage from './src/AppPage';
// import { Provider } from 'react-redux';
// import configureStore from './src/configureStore';

// const store = configureStore();

AppRegistry.registerComponent('montr', () => 
  // <Provider store={store}>
    <AppPage />
  // </Provider>
  );
