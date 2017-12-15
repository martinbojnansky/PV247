import * as actions from './../actions/Actions';
import { ErrorProps } from '../components/Error';

export function error(state: ErrorProps, action: actions.Action): ErrorProps {
  switch (action.type) {
    case actions.TypeKeys.SHOW_ERROR:
        return { 
            ...state,
            isVisible: true,
            title: action.title,
            description: action.description
        };
    case actions.TypeKeys.HIDE_ERROR:
        return {
            ...state,
            isVisible: false
        };
    default:
        return { ...state };
  }
}