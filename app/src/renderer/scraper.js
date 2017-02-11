import scrapeIt from 'scrape-it';

function getTorrents (show) {
  // Promise interface
  return scrapeIt(`https://thepiratebay.org/search/${show}/0/99/0`, {
    torrentData: {
      listItem: 'table#searchResult > tr ',
      data: {
        title: {
          selector: '.detName a'
        },
        size: {
          selector: 'font',
          convert: x => (x.split(',')[1].slice(6)) // Do some proccesing here
        },
        date: {
          selector: 'font',
          convert: x => (x.split(',')[0].slice(9)) // Do some proccesing here
        },
        leechers: {
          selector: 'td:nth-last-child(1)'
        },
        seeders: {
          selector: 'td:nth-last-child(2)'
        },
        magnetlink: {
          selector: 'a[title~=magnet]',
          attr: 'href'
        }
      }
    }
  });
};

export default getTorrents;
