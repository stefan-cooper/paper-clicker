import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

let middle = [thunk, logger];

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const actions = (state, action) => {
  switch (action.type) {
    /*case "example":
      return {
        ...state,
        exampleNewProp: action.payload
      };
    */

    case "updateClicks":
      return {
        ...state,
        clicks: action.payload
      }

    default: {
      return state;
    }
  }
};

/*export const examplePropMethod = {
  type: "example",
  payload: true
};
*/

export const update = (clicks) => {
  return {
    type: "updateClicks",
    payload: clicks
  }
}

const configureStore = () => {
  if (module.hot) {
    module.hot.accept(actions, () => {
      store.replaceReducer(actions);
    });
  }
  return store ;
};

export const store = createStore (
  persistReducer(persistConfig, actions),
  { isLoggedIn: false },
  applyMiddleware(...middle)
  );
export const persistor = persistStore(store);

export default configureStore;