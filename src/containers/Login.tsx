import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Login, { LogInDispatch } from './../components/Login';
import * as actions from './../actions/Login';

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): LogInDispatch {
  return {
      onLogIn: (email: string) => dispatch(actions.onLogIn(email))
  };
}

export default connect(undefined, mapDispatchToProps)(Login);