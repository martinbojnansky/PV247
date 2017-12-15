import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Logout, { LogOutDispatch } from './../components/Logout';
import * as actions from './../actions/Logout';

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): LogOutDispatch {
  return {
      onLogOut: () => dispatch(actions.logOut())
  };
}

export default connect(undefined, mapDispatchToProps)(Logout);