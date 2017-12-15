import * as React from 'react';
import './../styles/ProgressIndicator.css';

export interface ProgressIndicatorProps {
  isActive: boolean;
}

function ProgressIndicator(props: ProgressIndicatorProps) {
    return (
        <h4 className={`progress-indicator ${props.isActive ? 'visible' : ''}`}>
            <span className="badge badge-warning font-weight-normal">Please wait...</span>
        </h4>
    );
}

export default ProgressIndicator;