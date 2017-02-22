<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/colors";
$height: 2rem;

.dropdown {
  width: 1000px; // arbitrairy number that is overwritten when initialized
  max-width: 100%; // Should never be bigger than parent div
  min-height: $height;
  max-height: 5*$height;
  overflow-y: scroll;
  position: absolute;
  background-color: white;
  color: black;
  font-size: 0.6em;
  z-index: 2;
  &:hover {
    ul {
      display: block;
      margin: 0px;
    }
  }
}

.listitem{
  width: 100%;
  height: $height;
  line-height: $height;
  color: black;
  text-align: left;
  &:hover {
    background-color: black;
    color: white;
    // The regular gray is harder to read with a black background
    .size {
      color: lightgray;
    }
    // This one is quite funny, because the background becomes black it looks like the gray changes to a lighter color unless we do this
    .listitem-block {
      border-left: 1px gray solid;
    }
  }
  .title {
    padding-left: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: inline-block;
    max-height: 100%;
    width: calc(100% - 4rem - 4rem - 5rem - 20px)

  }
  .listitem-block {
    float: right;
    min-width: 4em;
    text-align: center;
    vertical-align: middle;
    border-left: 1px lightgray solid;
  }
  .seeders {
    @extend .listitem-block;
    color: #41e28b;
  }
  .leechers {
    @extend .listitem-block;
    color: #e15b71;
  }
  .size {
    @extend .listitem-block;
    color: gray;
    min-width: 6em;
  }
}

ul {
  list-style: none;
  padding: 0;
  display: none;
}

a {
  color: #42b983;
}
</style>
--------------------------------------------------------------------------------
<template lang="pug">
  .dropdown(:style="{width}")
    .listitem(@click="downloadTorrent(selected.magnetlink)")
      .title {{selected.title}}
      .leechers L:{{selected.leechers}}
      .seeders S:{{selected.seeders}}
      .size {{selected.size}}
    ul
      li(v-for="torrent in torrentlist")
        .listitem(@click="downloadTorrent(torrent.magnetlink)")
          .title {{torrent.title}}
          .leechers L:{{torrent.leechers}}
          .seeders S:{{torrent.seeders}}
          .size {{torrent.size}}
</template>
--------------------------------------------------------------------------------
<script>
import getTorrents from '../../scraper';

export default {
  name: 'torrent-dropdown',
  props: [
    'width',
    'show'
  ],
  data () {
    return {
      torrentlist: [],
      selected: {title: 'No torrents found', seeders: 0, leechers: 0, size: 'NaN'},
      currentData: {}
    };
  },
  created: function () {
    try {
      this.getTorrents(this.show.title, this.selectedEpisode.airedSeason, this.selectedEpisode.airedEpisodeNumber);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    getTorrents: function (title, airedSeason, airedEpisodeNumber) {
      if (typeof airedSeason === 'undefined' || typeof airedEpisodeNumber === 'undefined') {
        return new Error('airedSeason or airedEpisodeNumber is undefined');
      }
      getTorrents(`${title} S${airedSeason}E${airedEpisodeNumber}`)
      .then(torrentData => {
        if (torrentData[0] === undefined) {
          this.torrentlist = [];
          this.selected = {title: 'No torrents found', seeders: 0, leechers: 0, size: 'NaN'};
        } else {
          this.torrentlist = torrentData;
          this.selected = torrentData[0];
        };
        this.currentData = this.selectedEpisode;
      })
      .catch(e => {
        throw new Error(e);
      });
    },
    downloadTorrent: function (arg) {
      if (arg !== 'undefined') {
        window.location = arg;
      }
    }
  },
  computed: {
    selectedEpisode () {
      return this.show.episodes.selectedEpisode;
    }
  },
  watch: {
    selectedEpisode: function (val) {
      if (val !== this.currentData) {
        try {
          this.getTorrents(this.show.title, val.airedSeason, val.airedEpisodeNumber);
        } catch (e) {
          console.log(e);
        }
      };
    }
  }
};
</script>
