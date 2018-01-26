import * as api from './../../api/Authorization';
import { parse } from '../../api/Response';
import { API_URI } from '../../constants/ApiConstants';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';

const fetchMock = require('fetch-mock');

describe('tests authorization api', () => {
  beforeAll(() => {
    localStorage.setItem(localStorageKeys.TOKEN, "token");
  });
  afterAll(() => {
    localStorage.clear();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  
  it('calls authorize', () => {
    let token = "token"; 
    fetchMock.post(`${API_URI}auth`, JSON.stringify(token));
    parse<string>(api.authorize("email")).then(response => {
      expect(response).toEqual(token);
    });
  });
});