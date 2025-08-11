<script lang="ts">
    import { page } from '$app/state';

    $: currentLayout = getLayoutFromPath(page.url.pathname);

    function getLayoutFromPath(path: string): 'grid' | 'carousel' | 'honeycomb' | 'unknown' {
        if (path.includes('grid')) return 'grid';
        if (path.includes('carousel')) return 'carousel';
        if (path.includes('honeycomb')) return 'honeycomb';
        return 'unknown';
    }

    export let selectedMovies: any[];
    export let hoveredMovies: any[];
    export let itemId: any;
    export let isHoneycomb: boolean = false;
    export let movie: { 
        id: number,
        title: string,
        age_rating: string,
        release_date: string,
        overview: string,
        genres: string[],
        runtime: number,
        logo_backdrop_path: string,
        empty_backdrop_path: string,
        logo_path: string,
        logo_aspect_ratio: number
    }    
    // Format Time
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const formattedTime = `${hours > 0 ? hours+' h' : ''} ${minutes > 0 ? minutes + 'm' : ''}`.trim();

    // Format Image URL
    const imageURLBackdrop: string = `https://image.tmdb.org/t/p/w500/${movie.empty_backdrop_path}`
    const imageAlt = `${movie.title} Movie Poster`
    const imageURLLogo = `https://image.tmdb.org/t/p/original/${movie.logo_path}`

    let hoverTimeout: any;
    let hoverStartTime: number | null = null;
    function handleMouseEnter() {      
        hoverTimeout = setTimeout(() => {
            hoverStartTime = Date.now();
        }, 750);
    }

    function handleMouseLeave() {
        if (hoverStartTime) {
            const hoverDuration = Date.now() - hoverStartTime;
            hoveredMovies.push({itemId, hoverDuration});
        }
        hoverStartTime = null;
        clearTimeout(hoverTimeout);
    }

    let isSelected = false;
    const toggleSelect = () => {     
      const index = selectedMovies.indexOf(itemId);

      // If movie is already selected, remove it from the list, otherwise add it
      if (index !== -1) {
        selectedMovies.splice(index, 1);
        isSelected = false;
      } else {
        selectedMovies.push(itemId)
        isSelected = true;
      }
    };

    async function onPlayClick() {
        // Handle same logic as onMouseLeave otherwise last action is not logged.
        if (hoverStartTime) {
            const hoverDuration = Date.now() - hoverStartTime;
            hoveredMovies.push({ itemId, hoverDuration });
        }
        const response = await fetch('/api/log-interactions', {
            method: 'POST',
            headers: {'Conent-Type': 'application/json'},
            body:
                JSON.stringify({
                    layout: currentLayout,
                    chosenMovie: itemId,
                    watchlist: selectedMovies,
                    actions: hoveredMovies,
                    timestamp: Date.now(),
                }),
        });
        if (response.ok) {  
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect;
            } 
            else {
                console.error('Server returned success: false');
            }
        } 
        else {
            console.error(`Request failed with status ${response.status}`);
        }
    }

</script>

<div id="{itemId}" class="item" aria-label="Hoverable Item" role="group" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    <div class="poster">
        <div class="watch-icon material-symbols-outlined" class:hidden={!isSelected} class:honeycomb={isHoneycomb}>star</div>
        <img class="logo" alt={imageAlt} src={imageURLLogo} style="aspect-ratio: {movie.logo_aspect_ratio}"/>            
        <img class="backdrop" src={imageURLBackdrop} alt={imageAlt}/>
    </div>
    <div class="itemInfo">
        <div class="icons">
            <button class="icon material-symbols-outlined" on:click={onPlayClick} class:inverse={!isSelected}>play_arrow</button>
            <button class="icon material-symbols-outlined" on:click={toggleSelect}>{!isSelected ? "add" : "remove"}</button>
        </div>
        <div class="itemInfoTop">
            <span class="limit">{movie.age_rating ? movie.age_rating : "NA"}</span>
            <span class="duration">{formattedTime ? formattedTime : "1 h 24m"}</span>
            <span class="hd material-symbols-outlined">hd</span>
            <span class="year">{movie.release_date.slice(0, 4)}</span>
        </div>
        <div class="description">
            {movie.overview}
        </div>
        <div class="tags">
            {#each movie.genres.slice(0,3) as genre: String}
                <span class="tag">{genre}</span>
               
            {/each}
        </div>
    </div>
</div>

<style>
    .item{
        position: relative;
        height: 100%;
        color: white;
        z-index: 5;
        margin: auto;
        background-color: var(--lighter-background-color);
    }

    .item:hover{
        border-radius: 15px;
        overflow: visible;
        z-index: 50;
    }

    .item:hover .itemInfo{
        position: relative;
        box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.07);
    }

    .item:hover .itemInfo > *,
    .item:hover .itemInfo{
        transition-delay: 0.5s;
        opacity: 1;
    }

    .item:not(.no-hover):hover img.logo {
        transition-delay: 0.5s;
        top: 75%;
    }

    .poster {
        height: 100%;
    }

    .itemInfo{
        background-color: var(--lighter-background-color);
        display: flex;
        flex-direction: column;
        opacity: 0;
        transition: opacity 0.1s ease;
        transition-delay: 0s;
        padding: 10px;
    }

    .itemInfo > * {
        opacity: 0;
        transition: opacity 0.3s ease;
        transition-delay: 0s;
    }

    img{
        pointer-events: none;
    }

    img.backdrop{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    img.logo {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 30%;
        max-width: 70%;
        transform: translate(-50%, -50%);
        transition: top 0.3s linear;
        transition-delay: 0s;
    }

    .watch-icon {
        position: absolute;
        right: 0;
        color: red;
        background-color: black;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 0px;
        transition: right 0.3s 0.5s linear;
        transition: right 0.3s 0.5s linear, border-bottom-right-radius 0.3s 0.5s linear;

    }

    .watch-icon.hidden {
        display: none;
    }

    .item:not(:hover) .watch-icon.honeycomb {
        transition-delay: 0s;
        right: 45%;
        border-bottom-right-radius: 15px;
    }
 
    .icons{
        display: flex;
        margin-bottom: 10px;
    }

    button.icon{
        border: 1px solid white;
        padding: 5px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: white;
    }

    button.icon:hover {
        cursor: pointer;
    }

    button.icon:hover:not(.inverse){
        border: 1px solid var(--secondary-color);
        background-color: var(--secondary-color);
    }

    button.icon.inverse{
        cursor: not-allowed;
        background-color: var(--button-color);
        color: white;
    }
 
    .itemInfoTop{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--secondary-color);
        gap: 8px;
    }

    .limit {
        border: 0.15em solid white;
        display: inline-block;

        width: clamp(1rem, 0.8vw, 1.25rem);
        height: clamp(1rem, 0.8vw, 1.25rem);
        line-height: clamp(1rem, 0.8vw, 1.25rem);

        text-align: center;
        border-radius: 50%;
        background-color: black;
        color: white;
        font-weight: bold;

        font-size: clamp(0.5rem, 0.45vw, 0.75rem);
    }

    .description{
        margin-bottom: 10px;
    }
    
    .tags{
        display: flex;
    }

    .tag{
        color: white;
    }

    .tag:not(:last-child)::after{
        content: "•";
        color: var(--secondary-color);
        margin-left: 8px;
        margin-right: 8px;
    }

    :global(.item) .description,
    :global(.item) .tags,
    :global(.item) .itemInfoTop,
    :global(.item) .hd {
        font-size: clamp(0.625rem, 0.35vw + 0.2rem, 0.75rem) !important;
    }

    button.icon {
        font-size: clamp(0.75rem, 0.8vw, 1rem);
    }

    .watch-icon {
        font-size: clamp(0.875rem, 1.25vw, 1.25rem);
    }
 </style>