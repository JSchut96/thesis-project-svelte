<script lang="ts">
    import Carousel from "../../lib/components/Carousel.svelte"

    export let data;

    let selectedMovies: any[] = [];
    let hoveredMovies: any[] = [];
</script>


<div class="carousels"> 
    {#each [...data.genreOrder].reverse() as genre, genreIndex}
        <Carousel movies={data.movieDetailsByGenre[genre]} title={genre} {selectedMovies} {hoveredMovies} {genreIndex}/>
    {/each}

</div>

<style>
    .carousels{
        display: flex;
        flex-direction: column-reverse;
        padding-bottom: 15vw;
        padding-top: 2vw;
        overflow:hidden;
    }
</style>

