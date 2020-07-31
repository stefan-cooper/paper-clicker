import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

let middle = [thunk];

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

    case "updatePaper":
      return {
        ...state,
        paper: action.payload
      }
    
    case "updateAutoClickers":
      return {
        ...state,
        autoClickers: action.payload
      }

    case "updateMoney":
      return {
        ...state,
        money: action.payload
      }

    case "updateSalePrice":
      return {
        ...state,
        salePrice: action.payload
      }
    
    case "updateStock":
      return {
        ...state,
        stock: action.payload
      }
      
    case "updateWood":
      return {
        ...state,
        wood: action.payload
      }

    case "updateStage":
      return {
        ...state,
        stage: action.payload
      }
    
    case "updateEmployees":
      return {
        ...state,
        employees: action.payload
      }
    
    case "updateResearch":
      return {
        ...state,
        research: action.payload
      }

    case "updateThinkSpeed":
      return {
        ...state,
        thinkSpeed: action.payload
      }

    case "updatePaperMakerLevel":
      return {
        ...state,
        paperMakerLevel: action.payload
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

export const updPaper = (paper) => {
  return {
    type: "updatePaper",
    payload: paper
  }
}

export const updAutoClickers = (autoClickers) => {
  return {
    type: "updateAutoClickers",
    payload: autoClickers
  }
}

export const updMoney = (money) => {
  return {
    type: "updateMoney",
    payload: money
  }
}

export const updSalePrice = (salePrice) => {
  return {
    type: "updateSalePrice",
    payload: salePrice
  }
}

export const updStock = (stock) => {
  return {
    type: "updateStock",
    payload: stock
  }
}

export const updWood = (wood) => {
  return {
    type: "updateWood",
    payload: wood
  }
}

export const updStage = (stage) => {
  return {
    type: "updateStage",
    payload: stage
  }
}

export const updEmployees = (employees) => {
  return {
    type: "updateEmployees",
    payload: employees
  }
}

export const updResearch = (research) => {
  return {
    type: "updateResearch",
    payload: research
  }
}

export const updThinkSpeed = (thinkSpeed) => {
  return {
    type: "updateThinkSpeed",
    payload: thinkSpeed
  }
}

export const updPaperMakerLevel = (paperMakerLevel) => {
  return {
    type: "updatePaperMakerLevel",
    payload: paperMakerLevel
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
  {},
  applyMiddleware(...middle)
  );
export const persistor = persistStore(store);

export default configureStore;