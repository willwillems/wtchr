const testdata = require('./static/MOCK_DATA.js');
const torrentdata = require('./static/MOCK_TORRENT_DATA.js');
const seasondata = require('./static/MOCK_SEASON_DATA.js');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock
    // .onAny().passThrough()
    .onGet('/api/tv').reply(200, testdata)
    .onGet(/\/api\/gettorrents\/.+/).reply(200, torrentdata) // regex, . = any char + means between 1 and unlimited times
    .onGet(/\/api\/getseason\/.+\/\d+/).reply(200, seasondata) // regex, \. = any char + means between 1 and unlimited times
    .onAny().passThrough();

export default mock;
