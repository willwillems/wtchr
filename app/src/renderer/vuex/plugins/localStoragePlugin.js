import localforage from 'localforage';
// This module tracks certain mutations so they can be re-aplied when the app
// is restarted (e.g. so you dont have to input your info again and again)
var settingsStorage = localforage.createInstance({
  name: 'settings'
});

function localStoragePlugin (mutationsToTrack) {
  return store => {
    store.subscribe(mutation => {
      if (mutationsToTrack.indexOf(mutation.type) > -1) {
        settingsStorage.setItem(mutation.type, mutation.payload);
      };
    });
  };
};

export default localStoragePlugin([
  'setTVDBAPIKey',
  'setTVDBUsername',
  'setTVDBUserkey'
]);
