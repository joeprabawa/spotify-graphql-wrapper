const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: String
    display_name: String
    email: String
    href: String
    country: String
    playlists(limit: Int): [Playlist]
    images: [Image]
    followers: Followers
    type: String
    uri: String
  }

  type Image {
    height: Int
    width: Int
    url: String
  }

  type Playlist {
    id: String
    name: String
    collaborative: Boolean
    images: [Image]
    description: String
    href: String
    public: Boolean
    type: String
    owner: User
    tracks(limit: Int): [Track]
  }

  type Artist {
    id: String
    name: String
    href: String
    genres: [String]
    albums(limit: Int): [Album]
    popularity: Int
    followers: Followers
  }

  type Album {
    id: String
    name: String
    artists: [Artist]
    tracks(limit: Int): [Track]
    popularity: Int
    followers: Followers
    href: String
    images: [Image]
    release_date: String
    label: String
  }

  type Track {
    id: String
    name: String
    duration_ms: Int
    popularity: Int
    track_number: Int
    artists: [Artist]
    album: Album
  }

  type Followers {
    href: String
    total: Int
  }

  type Query {
    me: User
    getArtist(id: String): Artist
  }
`;
