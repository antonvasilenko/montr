// import configureStore from './configureStore';
import { getBuilds } from './actions';

const test = () => {
  const store = null; //require('./configureStore')();

  console.log(store.getState());

  const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );

  store.dispatch(getBuilds());

  unsubscribe();
};

export default test;
