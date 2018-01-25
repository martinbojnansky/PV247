import * as React from 'react';
import * as actions from './../actions/Actions';

export interface LogOutProps {
}

export interface LogOutDispatch {
  onLogOut?: () => Promise<actions.Action>;
}

function Logout(props: LogOutProps & LogOutDispatch) {
    return (
        <button 
            onClick={props.onLogOut}
            className="btn btn-danger"
        >
            Logout
        </button>
    );
}

export default Logout;