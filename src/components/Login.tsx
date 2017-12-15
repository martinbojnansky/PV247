import * as React from 'react';
import * as actions from './../actions/Actions';
import './../styles/Login.css';

export interface LogInProps {
}

export interface LogInDispatch {
  onLogIn: (email: string) => actions.LogInAction;
}

function Login(props: LogInProps & LogInDispatch) {
    let email = '';

    return (
        <div className="login card">
            <div className="card-body">
                <h4 className="card-title">Login</h4>
                <div className="form-group my-2">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control"
                        placeholder="Enter email address" 
                        defaultValue={email} 
                        onChange={(e) => { email = e.target.value; }} 
                    />
                </div>
                <div className="form-group">
                    <button 
                        onClick={() => { props.onLogIn(email); }}
                        className="form-control btn btn-primary"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;