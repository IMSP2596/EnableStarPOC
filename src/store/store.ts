import { createStore } from 'redux';
import reducer from './reducers/beneficeryreducer';
const store = createStore(reducer);

export default store;
