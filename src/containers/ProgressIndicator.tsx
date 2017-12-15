import { StoreState } from './../models/StoreState';
import { connect } from 'react-redux';
import ProgressIndicator, { ProgressIndicatorProps } from './../components/ProgressIndicator';

export function mapStateToProps({ progressIndicator }: StoreState): ProgressIndicatorProps {
  return {
    isActive: progressIndicator.isActive
  };
}

export default connect(mapStateToProps, undefined)(ProgressIndicator);