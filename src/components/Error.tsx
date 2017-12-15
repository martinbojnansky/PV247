import * as React from 'react';
import * as actions from './../actions/Actions';
import './../styles/Error.css';

export interface ErrorProps {
    isVisible: boolean;
    title: string;
    description: string;
}

export interface ErrorDispatch {
    onHide: () => actions.HideErrorAction;
}

function Error(props: ErrorProps & ErrorDispatch) {
    if (!props.isVisible) {
        return (
            <div/>
        );
    } else {
        return (
            <div>
                <div className="modal-backdrop fade show error" />
                <div className="modal fade show d-block error" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.title}</h5>
                                <button type="button" className="close" onClick={() => props.onHide()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {props.description}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={() => props.onHide()}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;