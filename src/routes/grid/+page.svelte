<script lang="ts">
    import Accordion from "../../lib/components/Accordion.svelte"

    export let data;

    let selectedMovies: any[] = [];
    let hoveredMovies: any[] = [];

    </script>

<div class="container">
    <Accordion genres={data.genreOrder} movieSets={data.movieDetailsByGenre} {selectedMovies} {hoveredMovies}/>
</div>


<style>
    .container {
        width: 100%;
    }
</style>

