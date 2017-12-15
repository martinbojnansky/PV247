import * as React from 'react';

export interface LogOutProps {
}

export interface LogOutDispatch {
  onLogOut?: () => void;
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