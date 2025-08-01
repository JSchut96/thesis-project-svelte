<script lang="ts">
    import Grid from "./Grid.svelte";

    export let genres: string[] = [];
    export let movieSets;
    export let selectedMovies;
    export let hoveredMovies;

    let activeGenre = genres[0];
    let index = 0;

    function selectGenre(genre: string) {
        activeGenre = genre;
    }
</script>
<div class="accordion">
    <div class="accordion-navigation">
        {#each genres as genre}
            <button class:active={genre === activeGenre} on:click={() => selectGenre(genre)}>
                {genre}
            </button>
        {/each}
    </div>
    <div class="accordion-content">
        {#each genres as genre, genreIndex}
            <Grid active={genre === activeGenre} movies={movieSets[genre]} {selectedMovies} {hoveredMovies} {genreIndex}/>
        {/each}
    </div>
</div>


<style>
    .accordion {
        margin: 2vw 0;
        padding-top: 2vw;
        width: calc(100vw - 120px);
        position: relative;
        margin: auto;
    }

    .accordion-navigation {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        margin: 2em 0;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: var(--button-color);
        color: white;
        cursor: pointer;
    }

    button.active{
        background-color: var(--secondary-color);
        color: black;
    }
</style>