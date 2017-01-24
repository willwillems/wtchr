<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "../assets/sass/colors";
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
<template>
  <div class="dropdown" :style={width}>
    <div class="listitem" @click="downloadTorrent(selected.magnetlink)">
      <div class="title">{{selected.title}}</div>
      <span class="leechers">L:{{selected.leechers}}</span>
      <span class="seeders">S:{{selected.seeders}}</span>
      <span class="size">{{selected.size}}</span>
    </div>
    <ul>
      <li v-for="torrent in torrentlist">
        <div class="listitem" @click="downloadTorrent(torrent.magnetlink)">
          <div class="title">{{torrent.title}}</div>
          <span class="leechers">L:{{torrent.leechers}}</span>
          <span class="seeders">S:{{torrent.seeders}}</span>
          <span class="size">{{torrent.size}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
import getTorrents from '../../scraper';

export default {
  name: 'torrent-dropdown',
  props: [
    'width',
    'episode',
    'title'
  ],
  data () {
    return {
      torrentlist: [],
      selected: {title: 'No torrents found', seeders: 0, leechers: 0, size: 'NaN'}
    };
  },
  updated: function () {
    // updated otherwise this executes without episode data
    this.getTorrents(`${this.title} S${this.episode.season}E${this.episode.episode}`);
  },
  methods: {
    getTorrents: function (query) {
      getTorrents(query)
      .then(torrent => {
        if (torrent.torrentData[0] === undefined) {
          throw new Error(`torrentData[0] was undefined with this query: ${query}`);
        };
        this.torrentlist = torrent.torrentData;
        this.selected = torrent.torrentData[0];
      })
      .catch(e => {
        throw new Error(e);
      });
    },
    downloadTorrent: function (arg) {
      window.location = arg;
    }
  },
  computed: {
    episo: function () {
      // It is not possible to watch a prop directly hence this proxy
      return this.episode.episode * this.episode.season;
    }
  },
  watch: {
    episo: function () {
      if (this.episode.season) {
        this.getTorrents(`${this.title} S${this.episode.season}E${this.episode.episode}`);
      };
    }
  }
};
</script>
