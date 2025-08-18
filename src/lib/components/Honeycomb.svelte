<script lang="ts">
    import Item from "./Item.svelte";
    import { onMount} from "svelte";

    export let movies;
    export let genres: string[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6'];
    export let selectedMovies: any[] = [];
    export let hoveredMovies: any[] = [];


    // Need to clone original movies array, because otherwise server side rendering fucks everything up
    let moviesByGenre: Record<string, any[]> = {};
    for (let i = 0; i < genres.length; i++) {
        moviesByGenre[genres[i]] = [...(movies[genres[i]] || [])];
    }

    // Window Variables
    let windowWidth = 0;
    let windowHeight = 0;

    let minOffsetX = 0;
    let maxOffsetX = 0;
    let minOffsetY = 0;
    let maxOffsetY = 0;
    
    // Drag Variables
    let startX:number = 0;
    let startY:number = 0;
    let offsetX: number = 0;
    let offsetY: number = 0;
    let dragging: boolean = false;

    // Hex Variables
    const center = {q: 0, r: 0, s: 0};
    let hexRadius = 0;
    const rings = 6;

    // Cell Groups
    const centerCells = [0];
    const setOne = [6, 17, 18, 34, 35, 36, 57, 58, 59, 60, 86,87,88,89,90,121,122,123,124,125,126];
    const setTwo = [1, 7, 8, 19, 20, 21, 37, 38, 39, 40, 61, 62, 63, 64, 65, 91, 92, 93, 94, 95, 96];
    const setThree = [2, 9, 10, 22, 23, 24, 41, 42, 43, 44, 66, 67, 68, 69, 70, 97, 98, 99 ,100, 101, 102];
    const setFour = [3, 11, 12, 25, 26, 27, 45, 46, 47, 48, 71, 72, 73, 74, 75, 103, 104, 105, 106, 107, 108];
    const setFive = [4, 13, 14, 28, 29, 30, 49, 50, 51, 52, 76, 77, 78, 79, 80, 109, 110, 111, 112,113,114];
    const setSix = [5, 15, 16, 31, 32, 33, 53,54,55,56,81,82,83,84,85,115,116,117,118,119,120];
    
    onMount(() => {
        // Set initial window width when component mounts
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        // Set hex radius based on screen size
        updateHexRadius();

        // Set grid offset to center screen
        updateOffset();

        // Optionally, you can listen for window resize events
        const handleResize = () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;

            updateOffset();
            updateHexRadius();
        };

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleResize);
        }

        // Cleanup the event listener when component is destroyed
        return () => {
            window.removeEventListener('resize', handleResize);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleResize);
            }
        };
    });

    // Calculate how to offset the honeycomb so the center hex is in the middle of the window
    function updateOffset() {
        offsetX = (windowWidth - 120) / 2 - hexRadius;
        offsetY = ((windowHeight - (windowWidth * 0.04) - 60) / 2) - hexRadius;

        minOffsetX = offsetX - (rings - 1.5) * hexRadius;
        maxOffsetX = offsetX + (rings - 1.5) * hexRadius;
        minOffsetY = offsetY - (rings - 1) * Math.sqrt(3) * hexRadius;
        maxOffsetY = offsetY + (rings - 1) * Math.sqrt(3) * hexRadius;
    }

    // On resize, recalculate hexRadius
    function updateHexRadius() {
        hexRadius = (windowWidth - 120) / 12;
        updateHexPositions();
    }

    // Recalculate cube index to pixel locations
    function updateHexPositions() {
        hexPositions = hexSpiral(rings).map(hex => {
            const {x,y} = cubeToPixel(hex);
            return {x, y};
        })
    }

    // Cube direction vectors
    const cubeDirections = [
        {q: +1, r: 0, s: -1}, {q: 0, r: +1, s: -1}, {q: -1, r: +1, s: 0},
        {q: -1, r: 0, s: +1}, {q: 0, r: -1, s: +1}, {q: +1, r: -1, s: 0}
    ];

    // Return hex neighbour based on direction vector
    function cubeNeighbor(hex : {q:number, r:number, s:number}, direction: number ) {
        const dir = cubeDirections[direction];
        return {q: hex.q + dir.q, r: hex.r + dir.r, s: hex.s + dir.s};
    }


    // Add one hex to another
    function hexAdd(a: {q:number, r:number, s:number}, b: {q:number, r:number, s:number}) {
        return {q: a.q + b.q, r: a.r + b.r, s: a.s + b.s};
    }

    // Multiply one hex with another
    function hexScale(a: {q:number, r:number, s:number}, x:number) {
        return {q: a.q * x, r: a.r  * x, s: a.s * x};
    }

    // Generate rings based on radius
    function hexSpiral(radius: number) {
        let results: {q:number, r:number, s:number}[] = [];
        for( let k = 0; k <= radius; k++) {
            const ring = hexRing(k);
            results = results.concat(ring);
        }
        return results;
    }

    // Add hexes to rings
    function hexRing(radius: number) {
        let results = [];
        if( radius === 0) {
            results.push( center);    
        } else {
            let hex = hexAdd(center, hexScale(cubeDirections[4], radius));
            for( let i = 0; i < 6; i++) {
                for( let j = 0; j < radius; j++) {
                    results.push(hex);
                    hex = cubeNeighbor(hex, i);
                }
            }
        }
        return results;
    }

    // Return pixel coordinates based on cube index
    function cubeToPixel({ q, r, s }:{q: number; r: number; s: number }) {
        return {
            x: hexRadius * (3./2 * q),
            y: hexRadius * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r)
        };
    }

    let hexPositions = hexSpiral(3).map(hex => {
        const { x, y } = cubeToPixel(hex);
        return {x, y};
    })    

    // Mouse drag function
    function startDrag(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.closest('button')) {
            return;
        }

        dragging = true;
        startX = event.clientX - offsetX;
        startY = event.clientY - offsetY;
        document.querySelectorAll('.movie-card')?.forEach(card => {card.classList.add('no-hover')});
        document.querySelectorAll('.item')?.forEach(card => {card.classList.add('no-hover')});
    }

    function drag(event: MouseEvent) {
        if (!dragging) return;
        offsetX = clamp(event.clientX - startX, minOffsetX, maxOffsetX);
        offsetY = clamp(event.clientY - startY, minOffsetY, maxOffsetY);
    }

    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    function stopDrag() {
        dragging = false;
        document.querySelectorAll('.movie-card')?.forEach(card => {card.classList.remove('no-hover')});
        document.querySelectorAll('.item')?.forEach(card => {card.classList.remove('no-hover')});
    }
</script>

<div class="container"
    class:dragging={dragging}
    role="button"
    tabindex="0"
    aria-label="Draggable honeycomb grid"
    on:mousedown={startDrag} 
    on:mousemove={drag} 
    on:mouseup={stopDrag} 
    on:mouseleave={stopDrag}>

    <div class="grid" style="--hex-radius: {hexRadius}px; --x: {offsetX}px; --y: {offsetY}px;">
        <div class="border-plate one"></div>
        <div class="border-plate two"></div>
        <div class="border-plate three"></div>
        <div class="border-plate four"></div>
        <div class="border-plate five"></div>
        <div class="border-plate six"></div>
        {#each hexPositions as { x, y }, i}
            {#if centerCells.includes(i)}
                <div class="movie-card center" style="left: {x}px; top: {y}px;">
                    <div class="center-label">Because you like</div>
                    {#each genres as genre, i}
                        <div class={`genre genre-${i+1}`}>{genre}</div>
                    {/each}
                </div>
            {:else if setOne.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[0]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`0.${setOne.findIndex(item => item === i)}`}/>
                </div>
            {:else if setTwo.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[1]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`1.${setTwo.findIndex(item => item === i)}`}/>
                </div>
            {:else if setThree.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[2]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`2.${setThree.findIndex(item => item === i)}`}/>
                </div>
            {:else if setFour.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[3]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`3.${setFour.findIndex(item => item === i)}`}/>
                </div>
            {:else if setFive.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[4]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`4.${setFive.findIndex(item => item === i)}`}/>
                </div>
            {:else if setSix.includes(i)}
                <div class="movie-card" style="left: {x}px; top: {y}px;">
                    <Item movie={moviesByGenre[genres[5]].shift()} isHoneycomb={true} {selectedMovies} {hoveredMovies} itemId={`5.${setSix.findIndex(item => item === i)}`}/>
                </div>
            {:else}
                <div class="movie-card inactive" style="left: {x}px; top: {y}px;">
                    <p>{i}</p>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        margin: auto;
        cursor: grab;
    }

    .container.dragging {
        cursor: grabbing;
    }

    .border-plate {
        --offset: calc(1.732 * var(--hex-radius) * 6 + 5px);
        position: absolute;
        height: var(--offset);
        width: calc(var(--hex-radius) / 2 + 5px);
        background-color: var(--main-color);
        z-index: 1;
    }

    .border-plate.one {
        clip-path: polygon(0% 8%, 95% 8%, 100% 100%, 0% 100%);
        transform: translateY(calc(-1 * var(--offset))) translateX(-7px);
    }

    .border-plate.two {
        clip-path: polygon(0% 8.5%, 100% 8%, 100% 100%, 0% 100%);
        transform: translateY(calc(-8.03 * var(--hex-radius))) translateX(calc(5.58*var(--hex-radius)))  rotate(60deg);
    }

    .border-plate.three {
        clip-path: polygon(0% 8.5%, 100% 8%, 100% 100%, 0% 100%);
        transform: translateY(calc(-1.98 * var(--hex-radius))) translateX(calc(6.35*var(--hex-radius)))  rotate(120deg);
    }

    .border-plate.four {
        clip-path: polygon(0% 0%, 100% 0%, 100% 91%, 0% 91%);
        transform: translateY(calc(1.71 * var(--hex-radius))) translateX(calc(1.47*var(--hex-radius)));
    }

    .border-plate.five {
        clip-path: polygon(0% 0%, 100% 0%, 100% 92%, 0% 91%);
        transform: translateY(calc(-0.69 * var(--hex-radius))) translateX(calc(-4.14*var(--hex-radius))) rotate(60deg);
    }

    .border-plate.six {
        clip-path: polygon(0% 0%, 100% 0%, 100% 92%, 0% 91%);
        transform: translateY(calc(-6.73 * var(--hex-radius))) translateX(calc(-4.88*var(--hex-radius)))  rotate(120deg);
    }

    .grid {
        transform: translate3d(var(--x, 0px), var(--y, 0px), 0);
    }

    .movie-card {
        --w: calc(var(--hex-radius) * 2 - 10px);
        --h: calc(var(--w) * sqrt(3)/2);
        position: absolute;
        aspect-ratio: 1.155 / 1;
        width: var(--w);
        background: rgba(255, 255, 255, 0.1);
        clip-path: polygon(25% 100%, 0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%);
        transition: transform 0.3s ease, aspect-ratio 0.3s ease;
        overflow: hidden;
        z-index: 2;
        -webkit-user-select: none;
        -ms-user-select: none; 
        user-select: none;
    }

    .movie-card:not(.no-hover):not(.center):hover {
        aspect-ratio: 1.8 / 1;
        transform: scale(1.45);
        transition-delay: 0.5s;
        animation: reveal-square 0.4s linear forwards 0.5s;
        overflow: visible;
        z-index: 50;
    }

    @keyframes hideOverflow {
        0% {
            overflow: visible;
        }
        99% {
            overflow: visible;
        }
        100% {
            overflow: hidden;
        }
    }

    @keyframes reveal-square {
        0% {
            clip-path: polygon(25% 100%, 0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%);
        }
        20%{
            clip-path: polygon(0% 1000%, 0% 47%, 22% 0%, 78% 0%, 100% 47%, 100% 1000%);
        }

        80%{
            clip-path: polygon(0% 1000%, 0% 3%, 3% 0%, 97% 0%, 100% 3%, 100% 1000%);
        }
        100% {
            clip-path: none;
        }
    }

    .movie-card.inactive{
        pointer-events: none;
        opacity: 0;
    }

    .movie-card.center {
        --w: calc(var(--hex-radius) * 2 + 10px);
        --h: calc(var(--w) * sqrt(3)/2);
        width: var(--w);
        height: var(--h);
        margin: 0;
        background-color: var(--main-color);
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-10px, -10px);
        color: white;
    }

    .movie-card .center-label {
        position: absolute;
        text-align: center;
        font-weight: bold;
        font-size: clamp(0.5rem, 0.8vw + 0.2rem, 1.5rem);
    }

    .movie-card .genre {
        position: absolute;
        font-size: clamp(0.5rem, 0.8vw + 0.2rem, 1.5rem);
        white-space: nowrap;
    }

    .genre-2 { top: 5%; left: 50%; transform: translate(-50%, -50%); }
    .genre-3 { top: 25%; right: 18%; transform: translate(50%, -50%) rotate(60deg); }
    .genre-4 { bottom: 25%; right: 18%; transform: translate(50%, 50%) rotate(-60deg); }
    .genre-5 { bottom: 5%; left: 50%; transform: translate(-50%, 50%); }
    .genre-6 { bottom: 25%; left: 18%; transform: translate(-50%, 50%) rotate(60deg); }
    .genre-1 { top: 25%; left: 18%; transform: translate(-50%, -50%) rotate(-60deg); }

    p {
        display: flex;
        justify-content: center;
        color: white;
        z-index: 50;
        margin-top: 50px;
    }    
</style>

