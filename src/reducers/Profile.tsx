import { ProfileProps } from './../components/Profile';
import * as actions from './../actions/Actions';

export function profile(state: ProfileProps, action: actions.Action): ProfileProps {
  switch (action.type) {
    case actions.TypeKeys.LOG_IN_COMPLETED:
      return { ...state, email: action.email };
    case actions.TypeKeys.GET_USER_STARTED:
      return { ...state, isUserCustomDataLoaded: false };
      case actions.TypeKeys.GET_USER_FAILED:
      return { ...state, isUserCustomDataLoaded: false };
    case actions.TypeKeys.GET_USER_COMPLETED:
      return { 
        ...state, 
        isUserCustomDataLoaded: true, 
        userCustomData: action.userCustomData,
        pictureUrl: action.pictureUrl,
        newDisplayName: action.userCustomData.displayName,
        newPicturePath: action.pictureUrl
       };
    case actions.TypeKeys.CANCEL_USER:
       return { ...state, isChanged: false };
    case actions.TypeKeys.SAVE_USER_STARTED:
      return { ...state };
    case actions.TypeKeys.SAVE_USER_FAILED:
      return { ...state };
    case actions.TypeKeys.SAVE_USER_COMPLETED:
      return { 
        ...state,
        isUserCustomDataLoaded: false,
        userCustomData: action.userCustomData,
        isChanged: false
      };
    case actions.TypeKeys.USER_DISPLAY_NAME_CHANGED:
      return { ...state, newDisplayName: action.displayName, isChanged: true };
    case actions.TypeKeys.USER_PICTURE_CHANGED:
      return { ...state, newPicturePath: action.picturePath, isChanged: true };
    default:
        return { ...state };
  }
}