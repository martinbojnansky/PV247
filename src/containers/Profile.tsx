import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Profile, { ProfileProps, ProfileDispatch } from './../components/Profile';
import * as actions from './../actions/Profile';

export function mapStateToProps({ profile }: StoreState): ProfileProps {
  return {
    isUserCustomDataLoaded: profile.isUserCustomDataLoaded,
    isChanged: profile.isChanged,
    email: profile.email,
    userCustomData: profile.userCustomData,
    pictureUrl: profile.pictureUrl,
    newDisplayName: profile.newDisplayName,
    newPicturePath: profile.newPicturePath 
  };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): ProfileDispatch {
  return {
    onPictureChanged: async (picturePath: string) => await dispatch(actions.onUserPictureChanged(picturePath)),
    onDisplayNameChanged: async (displayName: string) => await dispatch(actions.onUserDisplayNameChanged(displayName)),
    onLoad: async (email: string) => await dispatch(actions.onGetUser(email)),
    onSave: async (email: string, displayName: string, pictureFile?: File) => 
      await dispatch(actions.onSaveUser(email, displayName, pictureFile)),
    onCancel: () => dispatch(actions.onCancelUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);