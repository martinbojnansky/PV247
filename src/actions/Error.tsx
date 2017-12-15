import * as actions from './Actions';

export function onShowError(title: string, description: string): actions.ShowErrorAction {
    return {
        type: actions.TypeKeys.SHOW_ERROR,
        title: title,
        description: description
    };
}

export function onHideError(): actions.HideErrorAction {
    return {
        type: actions.TypeKeys.HIDE_ERROR
    };
}