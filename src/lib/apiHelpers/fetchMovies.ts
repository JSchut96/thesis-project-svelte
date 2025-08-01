import { TMDB_API_KEY } from '$env/static/private'
const apiKey = `api_key=${TMDB_API_KEY}`

export async function fetchMovies(
  movieNames: { title: string; year?: string }[]
) {
  const details: any[] = []

  // Fetch Movies
  for (const { title, year } of movieNames) {
    // Fetch Movie ID
    let movieID
    try {
      const query = `query=${title}&year=${year}`
      const apiURL = `https://api.themoviedb.org/3/search/movie`
      const response = await fetch(`${apiURL}?${apiKey}&${query}`)
      const data = await response.json()
      if (data.results.length > 0) {
        movieID = data.results[0].id
      } else {
        console.log(`No results found for ${title}`)
        continue
      }
    } catch (err) {
      console.log(`Failed to fetch movieID for ${title}`, err)
      return
    }

    let movie
    // Fetch Movie Details, Images & Release_Dates
    try {
      const apiURL = `https://api.themoviedb.org/3/movie/${movieID}`
      const append = `append_to_response=release_dates,images`
      const response = await fetch(
        `${apiURL}?${apiKey}&${append}&include_image_language=en,null`
      )
      movie = await response.json()
    } catch (err) {
      console.log(`Failed to fetch movie details for ${movieID}`, err)
    }

    // Grab Movie Backdrops & Logo
    const logo_backdrop = movie.images.backdrops.find(
      (item: Object & { iso_639_1: String }) => item.iso_639_1 === 'en'
    ).file_path
    const empty_backdrop = movie.images.backdrops.find(
      (item: Object & { iso_639_1: String }) => item.iso_639_1 === null
    ).file_path
    const movie_logo = 
      movie.images.logos.find((item: Object & { iso_639_1: String }) => item.iso_639_1 === 'en') ?? // First grab english logo
      movie.images.logos.find((item: Object & { iso_639_1: String }) => item.iso_639_1 === null);   // If this does not exist grab no language logo
    const movie_logo_path = movie_logo.file_path;

    // Grab Movie Age Rating
    const nlReleaseDates =
      movie.release_dates.results.find(
        (item: Object & { iso_3166_1: String }) => item.iso_3166_1 === 'NL'
      )?.release_dates || []
    const ageRating = nlReleaseDates.find(
      (release: Object & { certification: String }) =>
        release.certification !== ''
    )?.certification || 'NR' // NR for if there no certification found

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
      logo_path: movie_logo_path,
    })
  }
  return details
}
