import * as React from 'react';
import { Switch, Redirect } from 'react-router';
import Routes from './../constants/Routes';
import { AuthorizedRoute } from './AuthorizedRoute';
import './../styles/Layout.css';
import Logout from './../containers/Logout';
import Channels from './../containers/Channels';
import Profile from './../containers/Profile';

function Layout() {
    return (
        <div className="layout">
            <nav className="navbar navbar-expand-lg bg-dark text-white">               
                <a className="navbar-brand">PV247</a>
                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                        <a href={Routes.PROFILE} className="btn btn-info">Profile</a>
                    </li>
                    <li className="nav-item">
                        <Logout />
                    </li>                    
                </ul>
            </nav>
            <div>
                <Switch>
                    <Redirect exact={true} path={Routes.DEFAULT} to={Routes.CHANNELS} />
                    <AuthorizedRoute path={Routes.CHANNELS} component={Channels} /> 
                    <AuthorizedRoute path={Routes.PROFILE} component={Profile} /> 
                </Switch>   
            </div>
        </div>
    );
}

export default Layout;