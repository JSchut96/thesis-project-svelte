<script lang="ts">
    export let movie;
    export let selectedMovies: number[];

    let isSelected = false;

    const toggleSelect = () => {
      // Check if the movie.id is already in the selectedMovies list
      const index = selectedMovies.indexOf(movie.id);
      
      // If movie is already selected, remove it from the list, otherwise add it
      if (index !== -1) {
        selectedMovies.splice(index, 1);
        isSelected = false;
      } else {
        selectedMovies.push(movie.id)
        isSelected = true;
      }
    };

    let movieURL = `https://image.tmdb.org/t/p/original/${movie.logo_backdrop_path}`
</script>

    <div class="movie-poster" class:selected={isSelected} on:click={toggleSelect}>
        <img src={movieURL} alt={movie.title} />
    </div>
    
    <style>
        .movie-poster {
            cursor: pointer;
            text-align: center;
        }
        
        .movie-poster.selected {
            border: 2px solid var(--main-color);
        }
  </style>