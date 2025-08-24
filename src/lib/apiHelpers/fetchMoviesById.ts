import { TMDB_API_KEY } from '$env/static/private'
const apiKey = `api_key=${TMDB_API_KEY}`

export async function fetchMoviesById(movieIds: number[]) {
  const details: any[] = []

  // Fetch Movies
  for (const movieId of movieIds) {
    let movie
    // Fetch Movie Details, Images & Release_Dates
    try {
      const apiURL = `https://api.themoviedb.org/3/movie/${movieId}`
      const append = `append_to_response=release_dates,images`
      const response = await fetch(
        `${apiURL}?${apiKey}&${append}&include_image_language=en,null`
      )

      if(!response.ok){
        console.log(`HTTP error for ${movieId}:`, response.status, response.statusText)
      }
      movie = await response.json()
    } catch (err) {
      console.log(`Failed to fetch movie details for ${movieId}`, err)
    }

    // Grab Movie Backdrop, not poster because those are vertical
    const logo_backdrop = movie.images.backdrops.find(
      (item: Object & { iso_639_1: String }) => item.iso_639_1 === 'en' // With title/logo
    )?.file_path ?? null
    const empty_backdrop = movie.images.backdrops.find(
      (item: Object & { iso_639_1: String }) => item.iso_639_1 === null // Without title/logo
    )?.file_path ?? null
    const movie_logo = movie.images.logos.find(
        (item: Object & { iso_639_1: String }) => item.iso_639_1 === 'en') ??
      movie.images.logos.find(
        (item: Object & { iso_639_1: String }) => item.iso_639_1 === null) // Null because sometimes a logo in not based on a language (like the symbol for Pi)
    
    const logo_path = movie_logo?.file_path ?? null
    const logo_aspect_ratio = movie_logo?.aspect_ratio ?? null
    
    // Grab Movie Age Rating
    const nlReleaseDates =
      movie.release_dates.results.find(
        (item: Object & { iso_3166_1: String }) => item.iso_3166_1 === 'NL'
      )?.release_dates || []
    const ageRating = nlReleaseDates.find(
      (release: Object & { certification: String }) =>
        release.certification !== ''
    )?.certification || 'NR' // NR for if there is no certification

    // Grab Genres from {id, genre} to just {genre}
    const genres = movie.genres.map((g: { id: number; name: string }) => g.name)

    // Push Movie Details
    details.push({
      id: movie.id,
      title: movie.title,
      age_rating: ageRating,
      release_date: movie.release_date,
      overview: movie.overview,
      genres: genres,
      runtime: Number(movie.runtime),
      logo_backdrop_path: logo_backdrop,
      empty_backdrop_path: empty_backdrop,
      logo_path: logo_path,
      logo_aspect_ratio: logo_aspect_ratio,
    })
  }
  return details
}
