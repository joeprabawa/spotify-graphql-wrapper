const { spotifyApi } = require("./api");
module.exports = {
  Query: {
    me: async () => {
      try {
        const getMe = await spotifyApi.getMe();
        return getMe.body;
      } catch (error) {
        console.log(error);
      }
    },
    getArtist: async (_, args) => {
      try {
        const getArtist = await spotifyApi.getArtist(args.id);
        const data = getArtist.body;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  User: {
    playlists: async (parent, args) => {
      try {
        const getPlayists = await spotifyApi.getUserPlaylists(parent.id);
        const data = args.limit
          ? getPlayists.body.items.splice(0, args.limit)
          : getPlayists.body.items;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Playlist: {
    tracks: async (parent, args) => {
      try {
        const getPlyTracks = await spotifyApi.getPlaylistTracks(parent.id);
        const data = getPlyTracks.body.items.map((v) => {
          const {
            id,
            name,
            duration_ms,
            popularity,
            track_number,
            artists,
            album,
          } = v.track;
          return {
            id,
            name,
            duration_ms,
            popularity,
            track_number,
            artists,
            album,
          };
        });

        return args.limit ? data.splice(0, args.limit) : data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Artist: {
    albums: async (parent, args) => {
      try {
        const getAlbums = await spotifyApi.getArtistAlbums(parent.id);
        const data = getAlbums.body.items;
        return args.limit ? data.splice(0, args.limit) : data;
      } catch (error) {
        console.log(error);
      }
    },
    followers: async (parent) => {
      try {
        const getArtistFollowers = await spotifyApi.getArtist(parent.id);
        const data = getArtistFollowers.body.followers;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    popularity: async (parent) => {
      try {
        const getArtistPopularity = await spotifyApi.getArtist(parent.id);
        const data = getArtistPopularity.body.popularity;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Album: {
    tracks: async (parent, args) => {
      try {
        const getAlbumTracks = await spotifyApi.getAlbumTracks(parent.id);
        const data = getAlbumTracks.body.items;
        return args.limit ? data.splice(0, args.limit) : data;
      } catch (error) {
        console.log(error);
      }
    },
    label: async (parent) => {
      try {
        const getLabel = await spotifyApi.getAlbum(parent.id);
        const data = getLabel.body.label;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Track: {
    popularity: async (parent) => {
      try {
        const getTracksPopularity = await spotifyApi.getTrack(parent.id);
        const data = getTracksPopularity.body.popularity;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
