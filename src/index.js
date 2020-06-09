import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from  'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';

/*  Frontend Structure:
*   1. configureStore() => Create store (load previous store)
*   2. render(App) =>
*       2a. Set Provider as Store (use store info for frontend storage)
*       2b. Use PersistGate to send user to LoginPage if not logged in, and keep user logged in after refresh 
*       2c. Use BrowserRouter and Component to render current page of the App
*/

configureStore();

const render = Component => {
   return ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={''} persistor={persistor}>  
       <BrowserRouter>
         <Component />
       </BrowserRouter>
      </PersistGate>
     </Provider>,
     document.getElementById('root')
   );
 };

render(App);

if (module.hot) {
   module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(NextApp);
   });
}

serviceWorker.register();
