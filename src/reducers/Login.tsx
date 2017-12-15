import { LogInProps } from './../components/Login';
import * as actions from './../actions/Actions';

export function login(state: LogInProps, action: actions.Action): LogInProps {
  return { ...state };
}