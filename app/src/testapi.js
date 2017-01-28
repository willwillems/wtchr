import data from './personalData';

export function renewKey () {
  return;
}

export function keyIsValid () {
  return true;
}

export function checkKey () {
  if (!keyIsValid) {
    renewKey();
  }
}

export const getAuthKey = new Promise(function (resolve, reject) {
  checkKey();
  fetch("https://api.thetvdb.com/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(function (response) {
    return resolve(response.token);
  })
  .catch(function (error) {
    reject(Error(error));
  });
});

export function getFromTVDB (path) {
  return new Promise(function (resolve, reject) {
    getAuthKey.then(key => {
      fetch(`https://api.thetvdb.com/${path}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + key,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(r => resolve(r.data))
      .catch(e => reject(Error(e)));
    });
  });
};

export function getFavoriteShowIDs () {
  return new Promise(function (resolve, reject) {
    getFromTVDB('user/favorites')
    .then(r => r.favorites)
    .then(r => resolve(r))
    .catch(e => reject(Error(e)));
  });
};

export function getShowInfo (id) {
  return new Promise(function (resolve, reject) {
    getFromTVDB(`series/${id}`)
    .then(r => resolve(r))
    .catch(e => reject(Error(e)));
  });
};

export function getSeasons (id) {
  return new Promise(function (resolve, reject) {
    getFromTVDB(`series/${id}/episodes/summary`)
    .then(r => resolve(r.airedSeasons))
    .catch(e => reject(Error(e)));
  });
};

export function getEpisodes (id, season) {
  return new Promise(function (resolve, reject) {
    getFromTVDB(`series/${id}/episodes/query?airedSeason=${season}`)
    .then(r => resolve(r))
    .catch(e => reject(Error(e)));
  });
};

export function getFanArt (id) {
  return new Promise(function (resolve, reject) {
    getFromTVDB(`series/${id}/images/query?keyType=fanart&resolution=1920x1080&subKey=graphical`)
    .then(r => (r === undefined ? resolve(undefined) : resolve(`https://thetvdb.com/banners/${r[0].fileName}`))) // ternary operator to prevent weird string
    .catch(function (error) {
      if (error.response.status === 404) {
        return resolve(undefined); // Some shows are not populair enough to have fanart :(
      } else {
        reject(Error(error));
      }
    });
  });
};

export function proccesShowData (shows) {
  // closure to use it inside the promise
  var showsclosure = shows.map((show) => {
    return {
      added: show.added,
      title: show.seriesName,
      description: show.overview,
      id: show.id,
      episodes: {
        selectedEpisode: {},
        seasons: []
      }
    };
  });
  return new Promise(function (resolve, reject) {
    // No idea if this is stupid unconventional or genius
    // Stupid, async function would have been better
    Promise.all([
      Promise.all(shows.map(show => getFanArt(show.id))),
      Promise.all(shows.map(show => getSeasons(show.id)))
    ])
    .then(function (response) {
      return showsclosure
        .map((show, i) => {
          show.image = response[0][i];
          show.seasons = response[1][i];
          return show;
        });
    })
    .then(resolve)
    .catch(e => reject(Error(e)));
  });
};

export function produceShowData () {
  console.log('Activated produceShowData');
  return new Promise(function (resolve, reject) {
    getFavoriteShowIDs().then(showids => {
      Promise.all(showids.map(id => getShowInfo(id)))
      .then(proccesShowData).then(resolve)
      .catch(e => reject(Error(e)));
    });
  });
};
