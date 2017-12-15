import * as React from 'react';
import { Switch, Route } from 'react-router';
import Routes from './../constants/Routes';
import { AuthorizedRoute } from './AuthorizedRoute';
import ProgressIndicator from './../containers/ProgressIndicator';
import Error from './../containers/Error';
import './../styles/Bootstrap.css';

import Login from './../containers/Login';
import Layout from './../components/Layout';
import './../styles/Components.css';

export interface AppProps {
}

function App({ }: AppProps) {
    return (
      <div className="app">
        <main> 
          <Switch>
            <Route component={Login} path={Routes.LOG_IN}/>
            <AuthorizedRoute path={Routes.DEFAULT} component={Layout} /> 
          </Switch>     
        </main>
        <ProgressIndicator />
        <Error/>
      </div>
    );
}

export default App;
