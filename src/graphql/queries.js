/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      adult
      video
      backdrop_path
      original_title
      original_language
      overview
      popularity
      vote_average
      vote_count
      poster_path
      release_date
      title
      genre_ids
      createdAt
      updatedAt
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        adult
        video
        backdrop_path
        original_title
        original_language
        overview
        popularity
        vote_average
        vote_count
        poster_path
        release_date
        title
        genre_ids
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
