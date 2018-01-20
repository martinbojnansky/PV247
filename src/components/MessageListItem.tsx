import * as React from 'react';
import { StoreState } from '../models/StoreState';
import './../styles/MessageListItem.css';
import Message from './../models/Message';
import { Member } from './../models/Member';

export interface MessageListItemProps {
    message: Message;
    owner: Member;
    currentUserId: string;
}

export interface MessageListItemDispatch {
    onUpVote: () => void;
    onDownVote: () => void;
    onDelete: () => void;
}

export class MessageListItem extends React.Component<MessageListItemProps & MessageListItemDispatch, StoreState> {
    render() {
        return (
            <div className={`message-list-item ${isOwner(this.props) ? 'own' : ''}`}>
                {/* header */}
                {getHeader(this.props)}
                {/* content */}
                <div className={`message-list-item-row ${isOwner(this.props) ? 'own' : ''}`}>
                    {/* picture */}
                    {getProfilePicture(this.props)}
                    {/* message */}
                    <div className={`alert ${isOwner(this.props) ? 'alert-danger' : 'alert-warning'}`}> 
                        {this.props.message.value}
                    </div>
                    {/* vote buttons */}
                    {getVoteButtons(this.props)}
                    {/* delete button */}
                    {getDeleteButton(this.props)}
                </div>
            </div>
        );
    }
}

const isOwner = (props: MessageListItemProps & MessageListItemDispatch): boolean => {
    return props.message.createdBy === props.currentUserId;
};

function getHeader(props: MessageListItemProps & MessageListItemDispatch) {
    let createdDate = new Date(props.message.createdAt);
    
    return (
        <div className={`message-list-item-row mb-3 ${isOwner(props) ? 'own' : ''}`}>
            <small className="text-secondary">
                <strong className="mr-2">{props.owner ? props.owner.displayName : ''}</strong>
                <span>{createdDate.toLocaleString()}</span>
            </small>
        </div>
    );
}

function getProfilePicture(props: MessageListItemProps & MessageListItemDispatch) {
    return (
        <img 
            className="border rounded-circle bg-light"
            src={props.owner ? props.owner.pictureUrl : require('./../images/transparent.png')}
        /> 
    );
}

function getVoteButtons(props: MessageListItemProps & MessageListItemDispatch) {
    return (
        <div className="d-flex flex-row ml-2 mr-2">
            <span className="btn btn-sm btn-secondary">
                {props.message.customData.upVotes.length - props.message.customData.downVotes.length}
            </span>
            { !isOwner(props) 
                ?   <div className="d-flex flex-row">
                        <button className="btn btn-sm ml-1 mr-1" onClick={() => { props.onUpVote(); }}>
                            +
                        </button>
                        <button className="btn btn-sm" onClick={() => { props.onDownVote(); }}>
                            -
                        </button>
                    </div>
                :   <span/>
            }
        </div>
    );
}

function getDeleteButton(props: MessageListItemProps & MessageListItemDispatch) {
    if (isOwner(props)) {
        return (
            <button className="btn btn-danger btn-sm" onClick={() => { props.onDelete(); }}>
                Delete
            </button>
        );
    } else {
        return <span/>;
    }
}