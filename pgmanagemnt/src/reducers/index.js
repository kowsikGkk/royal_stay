import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
}
