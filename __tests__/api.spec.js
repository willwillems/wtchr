
import {
  _getAuthKey,
  _getFromTVDB,
  _getFavoriteShowIDs,
  _getShowInfo,
  _getSeasons,
  _getEpisodes,
  _getFanArt
} from '../app/src/renderer/api';

describe('The getAuthKey function', () => {
  it('will resolve the correct API key', () => {
    const fakeKey = "abc-123";
    const fakeSettings = { theTVDBLogin: {} };

    const fakeFetch = (url, headers, body) => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: fakeKey
        })
      });
    };

    return _getAuthKey(fakeFetch, fakeSettings)
      .then( key => expect(key).toBe(fakeKey) );
  });
  /*
  it('will give a correct error message', () => {
    const fakeKey = "abc-123";
    const fakeSettings = { theTVDBLogin: {} };

    const fakeFetch = (url, headers, body) => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          token: fakeKey
        })
      });
    };

    return _getAuthKey(fakeFetch, fakeSettings)
      .catch( key => expect(key).toBe(fakeKey) );
  });
  */
});

describe('The getFromTVDB function', () => {
  const fakeKey = "abc-123";
  const fakeData = "abc-123";
  const fakePath = 'test-123';
  const fakeGetAuthKey = () => Promise.resolve(fakeKey);

  it('will call Fetch with the correct url', () => {
    const fakeFetch = (url, headers) => {
      expect(url).toBe(`https://api.thetvdb.com/${fakePath}`);
      return Promise.resolve({
        json: () => Promise.resolve({ data: fakeData })
      });
    };
    return _getFromTVDB(fakeFetch, fakeGetAuthKey, fakePath);
  });

  it('will resolve in the correct data', () => {
    const fakeFetch = (url, headers) => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: fakeData })
      });
    };
    return _getFromTVDB(fakeFetch, fakeGetAuthKey, fakePath)
      .then( data => expect(data).toBe(fakeData) );
  });
});

describe('The getFavoriteShowIDs function', () => {
  it('will resolve the correct data', () => {
    const fakeData = "abc-123";
    const fakeGetFromTVDB = (path) => {
      return Promise.resolve({
        favorites: fakeData
      });
    };

    return _getFavoriteShowIDs(fakeGetFromTVDB)
      .then( favorites => expect(favorites).toBe(fakeData) );
  });
});

describe('The getShowInfo function', () => {
  it('will resolve the correct data', () => {
    const fakeData = "abc-123";
    const fakeGetFromTVDB = (path) => {
      return Promise.resolve(fakeData);
    };

    return _getShowInfo(fakeGetFromTVDB, "showID")
      .then( info => expect(info).toBe(fakeData) );
  });
});

describe('The getSeasons function', () => {
  it('will resolve the correct data', () => {
    const fakeData = "abc-123";
    const fakeGetFromTVDB = (path) => {
      return Promise.resolve({
        airedSeasons: fakeData
      });
    };

    return _getSeasons(fakeGetFromTVDB, "showID")
      .then( seasons => expect(seasons).toBe(fakeData) );
  });
});

describe('The getEpisodes function', () => {
  it('will resolve the correct data', () => {
    const fakeData = "abc-123";
    const fakeGetFromTVDB = (path) => {
      return Promise.resolve(fakeData);
    };

    return _getEpisodes(fakeGetFromTVDB, "showID", "showSeason")
      .then( episodes => expect(episodes).toBe(fakeData) );
  });
});

describe('The getFanArt function', () => {
  const fakeGetFromTVDB = (path, fakeFanArtList) => {
    return Promise.resolve(fakeFanArtList);
  };
  it('will resolve the correct data', () => {
    const fakeFanArtList = [{ fileName: "abc-123" }];
    const fakeGetFromTVDBData = (path) => fakeGetFromTVDB(path, fakeFanArtList);

    return _getFanArt(fakeGetFromTVDBData, "showID")
      .then( fanArt => expect(fanArt).toBe( `https://thetvdb.com/banners/${fakeFanArtList[0].fileName}` ) );
  });
  it('will resolve undefined when no fanArt is avaliable', () => {
    const emptyList = [];
    const fakeGetFromTVDBEmpty = (path) => fakeGetFromTVDB(path, emptyList);

    return _getFanArt(fakeGetFromTVDBEmpty, "showID")
      .then( seasons => expect(seasons).toBe( undefined ) );
  });
});
