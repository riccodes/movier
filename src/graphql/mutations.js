/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
