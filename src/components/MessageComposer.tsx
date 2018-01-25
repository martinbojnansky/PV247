import * as React from 'react';
import { StoreState } from '../models/StoreState';
import './../styles/MessageComposer.css';
import * as actions from './../actions/Actions';

export interface MessageComposerProps {
    message: string;
    isEnabled: boolean;
}

export interface MessageComposerDispatch {
    onMessageChanged: (message: string) => Promise<actions.Action>;
    onSend: (message: string) => Promise<actions.Action>;
}

export default class Conversation extends React.Component<MessageComposerProps & MessageComposerDispatch, StoreState> {
    render() {     
        return (
            <div className="message-composer">
                <input
                    type="text"
                    id="message-composer-input"
                    placeholder="Type your message here..."
                    className="form-control"
                    value={this.props.message}
                    disabled={!this.props.isEnabled}
                    onChange={(e) => { this.props.onMessageChanged(e.target.value); }}
                />
                <button
                    className="btn btn-success ml-2"
                    onClick={() => { 
                        this.props.onSend(this.props.message); 
                    }}
                    disabled={!this.props.isEnabled || this.props.message === ''}
                >
                    Send
                </button>
            </div>
        );
    }
}