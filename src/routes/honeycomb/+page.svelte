<script lang="ts">
    import Honeycomb from "../../lib/components/Honeycomb.svelte"
    export let data;

    let selectedMovies: any[] = [];
    let hoveredMovies: any[] = [];

</script>

    <div class="container">
        <Honeycomb movies={data.movieDetailsByGenre} genres={data.genreOrder} {selectedMovies} {hoveredMovies}/>
    </div>


<style>
    .container{
        width: calc(100vw - 120px);
        height: calc(100vh - 4vw - 60px);
        border: 0.5rem inset var(--main-color);
        overflow: hidden;
        position: absolute;
        left: 60px;
        top: 2vw;
    }
</style>