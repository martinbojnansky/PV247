import * as React from 'react';
import * as actions from './../actions/Actions';
import './../styles/Profile.css';
import { UserCustomData } from './../models/User';
import { StoreState } from '../models/StoreState';

export interface ProfileProps {
    email: string;
    isUserCustomDataLoaded: boolean;
    isChanged: boolean;
    userCustomData: UserCustomData;
    pictureUrl: string;   
    newDisplayName: string;
    newPicturePath: string;
}

export interface ProfileDispatch {
    onDisplayNameChanged: (displayName: string) => Promise<actions.Action>;
    onPictureChanged: (picturePath: string) => Promise<actions.Action>;
    onLoad: (email: string) => Promise<actions.Action>;
    onSave: (email: string, displayName: string, newPictureFile?: File) => Promise<actions.Action>;
    onCancel: () => actions.Action;
}

export class Profile extends React.Component<ProfileProps & ProfileDispatch, StoreState> {
    componentWillMount() {
        this.props.onLoad(this.props.email);
    }
    
    render() {      
        return (
            <form className="profile">
                <h5>{this.props.email}</h5>
                {/* display name */}
                <div className="form-group my-2 d-block">
                    <label>Display name:</label>
                    <input 
                        type="text" 
                        id="display-name" 
                        className="form-control"
                        placeholder="New display name"
                        value={this.props.newDisplayName}
                        onChange={(e) => { this.props.onDisplayNameChanged(e.target.value); }}
                    />            
                </div>
                {/* profile picture */}
                <div className="form-group my-2">
                    <label>Profile picture</label>
                    <div className="card bg-light px-2 pt-2 pt-2 pb-2">
                        <img 
                            id="preview"
                            className="profile-picture rounded-circle" 
                            src={
                                this.props.newPicturePath !== '' 
                                ? this.props.newPicturePath 
                                : require('./../images/transparent.png')
                            } 
                        />
                        <input 
                            type="file" 
                            id="picture-upload" 
                            className="form-control-file mt-2" 
                            max={1}
                            onChange={(e) => { 
                                if (e.target.files) {
                                    this.props.onPictureChanged(URL.createObjectURL(e.target.files[0])); 
                                }
                            }}
                        />
                    </div>
                </div>
                {/* actions */}
                <div className="form-group text-white mt-2">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.props.onCancel()}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        id="save-btn"
                        className="btn btn-success ml-2" 
                        onClick={() => {                        
                            let fileUpload = document.querySelector('#picture-upload') as HTMLInputElement;
                            let files = fileUpload.files;
                            let file: File | undefined;
                            if (files !== null) {
                                file = files[0];
                            }
                            this.props.onSave(this.props.email, this.props.newDisplayName, file);
                        }}
                        disabled={!this.props.isChanged}
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    }  
}

export default Profile;