import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import MessageComposer, { MessageComposerProps, MessageComposerDispatch } from '../components/MessageComposer';
import * as actions from './../actions/MessageComposer';

export function mapStateToProps({ messageComposer }: StoreState): MessageComposerProps {    
  return {
      message: messageComposer.message,
      isEnabled: messageComposer.isEnabled
  };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): MessageComposerDispatch {  
  return {
    onMessageChanged: async(message: string) => await dispatch(actions.onMessageChanged(message)),
    onSend: async (message: string) => await dispatch(actions.onSendMessage(message))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageComposer);
