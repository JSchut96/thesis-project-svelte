<script lang="ts">
    import { onMount} from "svelte";
    import Item from "./Item.svelte";

    export let movies;
    export let active;
    export let selectedMovies;
    export let hoveredMovies;
    export let genreIndex;

    let element: HTMLElement | null;;

    let columns = 5;

    onMount(() => {      
        // Set transform origin of first and last visible element so they don't go off screen (this way first because on init active class is not yet set)
        const elementsFirst = element?.querySelectorAll(`.movie-card:nth-of-type(${columns}n+1)`);
        const elementsLast = element?.querySelectorAll(`.movie-card:nth-of-type(${columns}n)`);
        elementsFirst!.forEach(el => {
            (el as HTMLElement).style.transformOrigin = "left 150%";
        });
        elementsLast!.forEach(el => {
            (el as HTMLElement).style.transformOrigin = "right 150%";
        });
    })
</script>

<div class={`movie-grid ${active ? 'active' : ''}`} style="--columns: {columns}" bind:this={element}>
    {#each movies as movie, movieIndex}
        <div class="movie-card">
            <Item {movie} {selectedMovies} {hoveredMovies} itemId={`${genreIndex}.${movieIndex}`}/>
        </div>
    {/each}
</div>

<style>
    .movie-grid {
        display: none;
        grid-template-columns: repeat(var(--columns), 1fr);
        gap: 1rem;
        padding-top:0.75vw;
        z-index: 1;
    }

    .movie-grid.active {
        display: grid;
    }

    .movie-card {
        position: relative;
        aspect-ratio: 1.8 / 1;
        transition: transform 0.3s ease, z-index 0.3s ease;
        transition-delay: 0s;
        border-radius: 5px;
        transform-origin: 50% 150%;
        overflow: hidden;
        z-index: 2;
    }

    .movie-card:hover{
        transform: scale(1.45);
        z-index: 50;
        transition-delay: 0.5s;
        border-radius: 0px;
        overflow: visible;
        box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
    }
    
</style>