// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
// import fetchMock from 'fetch-mock';
// import * as actions from './../../actions/Login';
// import { TypeKeys as types } from './../../actions/Actions';
// import { API_URI, defaultHeaders } from './../../constants/ApiConstants';

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

// describe('tests login actions', () => {
//   afterEach(() => {
//     fetchMock.reset()
//     fetchMock.restore()
//   })

//   it('logs in', () => {
//     const email = 'email';
//     fetchMock
//       .getOnce(`${API_URI}auth`, { body: { email }, defaultHeaders });

//     const expectedActions = [
//       { type: types.LOG_IN_STARTED },
//       { type: types.LOG_IN_COMPLETED, email: email}
//     ];
//     const store = mockStore({  });

//     return store.dispatch(actions.onLogIn(email)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })