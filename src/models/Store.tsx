import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { StoreState, initialState } from './StoreState';
import { history } from './History';
import { reducers } from './../reducers/Reducers';

export const store = createStore<StoreState>(
    connectRouter(history)(reducers),
    initialState,
    compose(
        applyMiddleware(
          routerMiddleware(history)
        ),
      ),
);