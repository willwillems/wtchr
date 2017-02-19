
import { _getAuthKey, _getFromTVDB } from '../app/src/renderer/api';

describe('The getAuthKey function', () => {
  test('will resolve the correct API key', () => {
    const fakeKey = "abc-123";
    const fakeSettings = { theTVDBLogin: {} };

    const fakeFetch = (url, headers, body) => {
      return Promise.resolve({
        json: () => Promise.resolve({
          token: fakeKey
        })
      })
    };

    return _getAuthKey(fakeFetch, fakeSettings)
      .then( key => expect(key).toBe(fakeKey) );
  });
});

describe('The getFromTVDB function', () => {
  const fakeKey = "abc-123";
  const fakeData = "abc-123";
  const fakePath = 'test-123';
  const fakeGetAuthKey = () => Promise.resolve(fakeKey);

  test('will call Fetch wit the correct url', () => {
    const fakeFetch = (url, headers) => {
      expect(url).toBe(`https://api.thetvdb.com/${fakePath}`);
      return Promise.resolve({
        json: () => Promise.resolve({ data: fakeData })
      });
    };
    return _getFromTVDB(fakeFetch, fakeGetAuthKey, fakePath);
  });

  test('will resolve in the correct data', () => {
    const fakeFetch = (url, headers) => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: fakeData })
      });
    };
    return _getFromTVDB(fakeFetch, fakeGetAuthKey, fakePath)
      .then( data => expect(data).toBe(fakeData) );
  });
});
