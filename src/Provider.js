import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppPage from './AppPageContainer';

const store = configureStore();

const Root = () =>
  <Provider store={store}>
    <AppPage />
  </Provider>;

export default Root;
