import * as api from './../../api/User';
import { parse } from '../../api/Response';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import { UserCustomData, User } from '../../models/User';
import { BlobFile } from '../../models/BlobFile';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';

const fetchMock = require('fetch-mock');
require('jest-localstorage-mock');

describe('tests users api', () => {
    beforeAll(() => {
        localStorage.setItem(localStorageKeys.TOKEN, "token");
      });
      afterAll(() => {
        localStorage.clear();
      });
      afterEach(() => {
        fetchMock.restore();
      });
  
  it('gets user', () => {
    let email = "email";
    let userCustomData: UserCustomData = {
        displayName: "user",
        pictureId: "picture"
    };
    let user: User = {
        email: email,
        customData: JSON.stringify(userCustomData)
    };
    fetchMock.get(`${API_URI}${API_KEY}/user/${email}`, user);
    parse<User>(api.getUser(email)).then(response => {
      expect(response).toEqual(user);
    });
  });

  it('saves user', () => {
    let email = "email";
    let userCustomData: UserCustomData = {
        displayName: "user",
        pictureId: "picture"
    };
    let user: User = {
        email: email,
        customData: JSON.stringify(userCustomData)
    };
    fetchMock.put(`${API_URI}${API_KEY}/user/${email}`, user);
    parse<User>(api.saveUser(email, userCustomData)).then(response => {
      expect(response).toEqual(user);
    });
  });

  it('gets user picture', () => {
    let pictureId = "id";
    let pictureUrl = "url";
    fetchMock.get(`${API_URI}file/${pictureId}/download-link`, JSON.stringify(pictureUrl));
    parse<string>(api.getUserPicture(pictureId)).then(response => {
        expect(response).toEqual(pictureUrl);
      });
  });

  it('saves user picture', () => {
    let file: File = {
        name: "",
        type: "",
        size: 1,
        lastModifiedDate: "",
        webkitRelativePath: "",
        msClose: () => {},
        msDetachStream: () => {},
        slice: (start?: number, end?: number, contentType?: string) => {
            return new Blob();
        }
    };
    let savedFiles: BlobFile[] = [
        {
            id: "id",
            name: "name",
            extension: ".ext",
            createdBy: "email",
            fileSize: 1
        }
    ];
    fetchMock.post(`${API_URI}file`, savedFiles);
    parse<BlobFile[]>(api.saveUserPicture(file)).then(response => {
        expect(response).toEqual(savedFiles);
      });
  });
});