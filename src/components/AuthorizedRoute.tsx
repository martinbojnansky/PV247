import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Routes from './../constants/Routes';
import * as localStorageConstants from './../constants/LocalStorageConstants';

const renderAuthorizedRouteComponent = (props: {}) => (Component: any) => {
    return class AuthorizedRouteSwitch extends React.PureComponent {
        render() {
            let token: string | null = localStorage.getItem(localStorageConstants.Keys.TOKEN);
            return (
                 (token !== null && token !== '') ?
                <Component {...props}/> 
                : <Redirect to={{ pathname: Routes.LOG_IN }}/>
            );
        }
    };
};

export const AuthorizedRoute = ({ component, ...rest }: any) => (
    <Route {...rest} component={renderAuthorizedRouteComponent(rest)(component)} />
);

export default AuthorizedRoute;