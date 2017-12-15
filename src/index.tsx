import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './models/Store';
import { history } from './models/History';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './components/App';
import './styles/Index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
