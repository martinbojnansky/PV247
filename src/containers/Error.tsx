import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Error, { ErrorDispatch, ErrorProps } from './../components/Error';
import * as actions from './../actions/Error';

export function mapStateToProps({ error }: StoreState): ErrorProps {
  return {
    isVisible: error.isVisible,
    title: error.title,
    description: error.description
  };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): ErrorDispatch {
  return {
    onHide: () => dispatch(actions.onHideError())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);