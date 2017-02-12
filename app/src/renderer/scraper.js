import cheerio from 'cheerio'

function getTorrents (show) {
  return fetch(`https://thepiratebay.org/search/${show}/0/99/0`)
    .then(function(res) {
      console.log(res);
      return res.text();
    })
    .then(html => {
      var $ = cheerio.load(html);
      return $("tr").filter(function (i, el) {
        try {
          return el.children[1].name === "td";
        } catch (e) {
          return false
        }
      }).map((i, el) => {
        try {
          return {
            size: el.children[3].children[8].children[0].data.split(',')[1].slice(6),
            date: el.children[3].children[8].children[0].data.split(',')[0].slice(9),
            magnetlink: el.children[3].children[3].attribs.href,
            title: el.children[3].children[1].children[1].firstChild.data,
            seeders: el.children[5].firstChild.data,
            leechers: el.children[7].firstChild.data
          };
        } catch (e) {
          return;
        };
      });
    });
};

export default getTorrents;
