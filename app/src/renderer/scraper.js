import cheerio from 'cheerio';

function getTorrents (show) {
  return fetch(`https://thepiratebay.org/search/${show}/0/99/0`)
    .then(function (res) {
      return res.text();
    })
    .then(html => {
      const $ = cheerio.load(html, {
        normalizeWhitespace: true
      });
      const listElements = $("tr");
      // convert object to an array and filter out the elements we don't need
      const torrentList = Object.keys(listElements)
        .map(key => listElements[key]) // convert object to array
        .filter(function (el) {
          try {
            return el.children[1].name === "td";
          } catch (e) {
            return false;
          }
        });
      // If the list has one or no entries there are no torrents
      if (torrentList.length <= 1) {
        return [];
      };
      return torrentList.reduce((result, el) => {
        try {
          return [...result, {
            // No negative index in JS :(
            size: el.children[3].children[el.children[3].children.length - 2].children[0].data.split(',')[1].slice(6),
            date: el.children[3].children[el.children[3].children.length - 2].children[0].data.split(',')[0].slice(9),
            magnetlink: el.children[3].children[3].attribs.href,
            title: el.children[3].children[1].children[1].firstChild.data,
            seeders: el.children[5].firstChild.data,
            leechers: el.children[7].firstChild.data
          }];
        } catch (e) {
          return result;
        }
      });
    })
    .catch(e => {
      throw new Error(e);
    });
};

export default getTorrents;
