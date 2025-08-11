<script lang="ts">
    import MoviePoster from "../../lib/components/MoviePoster.svelte"

    export let data;

    let error = '';

    // Explanation popup
    let showIntro = true;
    function closeIntro() {
        showIntro = false;
    }

    let movies = data.movies;
    let selectedMovies: any[] = [];

    const genres = ["Action", "Adventure", "Drama", "Comedy", "Thriller", "Romance"];

    async function handleSubmit() {
        let sortedGenres;
        let selectedMovieIds;

        //Selected too few movies
        if(selectedMovies.length < 5){
            error = "Please select at least 5 movies.";
            return
        }
        else {
            error = ""
            //Filter the selected movies by their IDs
            const selectedMoviesList = movies.filter(movie => selectedMovies.includes(movie.id));
            selectedMovieIds = selectedMoviesList.flatMap(movie => movie.id);

            //Collect all genres from the selected movies
            const selectedGenres = selectedMoviesList.flatMap(movie => movie.genres);

            //Filter out genres that are not part of the main 6 genres
            const filteredGenres = selectedGenres.filter(v => genres.includes(v));
            
            //Count occurences of each genre
            const genreCountMap = filteredGenres.reduce((acc, genreId) => {
                acc[genreId] = (acc[genreId] || 0) + 1;
                return acc;
            }, {});

            //Sort by occurence and display only the genre strings
            sortedGenres = (Object.entries(genreCountMap) as [string, number][])
                .sort(([, a], [, b]) => b - a)
                .map(([genre]) => genre);

            //If there is a genre from the main list missing, add it to the end of the list
            for (const genre of genres) {
                if (!sortedGenres.includes(genre)) {
                    sortedGenres.push(genre);
                }
            }
        }

        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ genres: sortedGenres, movies: selectedMovieIds }),
            });

            if (response.ok) {  
                const result = await response.json();
                if (result.success) {
                    window.location.href = '/instructions';
                } else {
                    console.error('Server returned success: false');
                }
            } else {
                console.error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
        console.error('Fetch error:', error);
        }
    };
</script>

{#if showIntro}
  <div class="overlay">
    <div class="popup">
      <h2>Welcome!</h2>
      
      <p>To help us understand your preferences, please select the movies you've watched or you're the most interested in.
         You can pick several that you like (at least 5). Your selections will help us personalize the next steps.</p>
      <p>Once you're done, press the Submit button.</p>
      <button class="submit-button" on:click={closeIntro}>Got it!</button>
    </div>
  </div>
{/if}

<div class="container">
    <div class="movie-grid">
        {#each movies as movie}
            <MoviePoster {movie} {selectedMovies} />
        {/each}
        </div>
        <p class="error">{error}</p>
        <button class="submit-button" on:click={handleSubmit}>
            <p>Submit</p>
        </button>
</div>

<style>
    .container {
        position: relative;
        padding-top: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .movie-grid {
        width: calc(100vw - 120px);
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(14%, 1fr));
        gap: 16px;
    }

    .error {
        color: red;
        min-height: 1.5em;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .popup {
        background: var(--lighter-background-color);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 50vw;
        text-align: center;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.8vw;
    }

    button {
        padding: 0.25rem 1rem;
        background: var(--main-color);
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-bottom: 60px;
    }
</style>

