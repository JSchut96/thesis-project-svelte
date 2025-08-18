<script lang="ts">
    import { onMount} from "svelte";
    import Item from "./Item.svelte";
    import Swiper from 'swiper';
    import { register } from 'swiper/element/bundle';

    // register Swiper custom elements
    register();

    let element: HTMLElement & { swiper: Swiper } | null;
    export let title: string = 'This is the header';
    export let movies;
    export let selectedMovies;
    export let hoveredMovies;
    export let genreIndex;

    const spaceBetween = 10;
    const slides = 6;

    onMount(() => {      
        // Set transform origin of first and last visible element so they don't go off screen (this way first because on init active class is not yet set)
        const elementsFirst = element?.querySelectorAll(`swiper-slide:nth-of-type(${slides}n+1)`);
        const elementsLast = element?.querySelectorAll(`swiper-slide:nth-of-type(${slides}n)`);
        elementsFirst!.forEach(el => {
            (el as HTMLElement).style.transformOrigin = "left 150%";
        });
        elementsLast!.forEach(el => {
            (el as HTMLElement).style.transformOrigin = "right 150%";
        });
    })

    const handlePrev = () => {
        element?.swiper.slidePrev();
    }

    const handleNext = () => {
        element?.swiper.slideNext();
    }
</script>

<div class="carousel-container">
    <h2 class="carousel-header">
        <span class="carousel-row-title">
            <div class="carousel-row-header-title">
                Because you like {title}
            </div>
        </span>  
    </h2>
    <swiper-container 
        bind:this={element}
        slides-per-view={slides}
        slides-per-group={slides}
        loop={true}
        space-between={spaceBetween}
        pagination
        speed={1000}
        allow-touch-move={false}
        class="swiperStyle"
    >

        <div slot="container-start">
            <button class="button prev material-symbols-outlined" onclick={handlePrev}>chevron_left</button>
        </div>
        <div slot="container-end">
            <button class="button next material-symbols-outlined" onclick={handleNext}>chevron_right</button>        
        </div>

        {#each movies as movie: Object, movieIndex}
            <swiper-slide><Item {movie} {selectedMovies} {hoveredMovies} itemId={`${genreIndex}.${movieIndex}`}/></swiper-slide>
        {/each}
    </swiper-container>
</div>

<style>
    .carousel-container{
        margin: 2vw 0;
        z-index: 1;
    }

    swiper-container::part(container){
        width: calc(100vw - 120px);
        position: relative;
        z-index: 0;
        overflow: visible;
    }

    swiper-container::part(wrapper){
        z-index: 2;
    }

    .button{
        color: white;
        position: absolute;
        height: 101%;
        width: 60px;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: 0;
        background-color: rgb(22,22,22, 0.5);
        font-size: 44px;
        border: none;
        cursor: pointer;
        z-index: 5;

    }

    .button.prev{
        left: -60px;
    }

    .button.next{
        right: -60px;
    }

    .button:hover{
        background-color: rgb(22,22,22, 0.8);
    }

    .swiperStyle:hover .button{
        opacity: 1;
    }

    swiper-container::part(pagination){
        display: flex;
        justify-content: flex-end;
        right: 0;
        top: -5%;
        z-index: -1;
    }

    swiper-container::part(bullet),
    swiper-container::part(bullet-active){
        width: 12px;
        height: 2px;
        display: inline-block;
        background-color: hsl(0deg 0% 70%);
        border-radius: 0px;
        transition: all 0.2s ease-in-out 0s;
        margin: 0px 0px 0px 2px !important;
    }

    swiper-container::part(bullet-active){
        background-color: var(--secondary-color);
    }

    swiper-slide{
        position: relative;
        aspect-ratio: 1.8 / 1;
        transition: transform 0.3s ease, z-index 0.3s ease;
        transition-delay: 0s;
        border-radius: 5px;
        transform-origin: 50% 150%;
        overflow: hidden;
    }

    swiper-slide:hover{
        transform: scale(1.55);
        z-index: 50;
        transition-delay: 0.5s;
        border-radius: 0px;
        overflow: visible;
        box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
    }

    .carousel-header{
        line-height: 1.3;
        margin: 0;
    }

    .carousel-row-title{
        margin-left: 60px;
        margin-bottom: .5em;
        color: var(--secondary-color);
        display: inline-block;
        font-size: 1.4vw;
        font-weight: 500;
        min-width: 6em;
    }

    .carousel-row-header-title{
        display: table-cell;
        font-size: 1.4vw;
        line-height: 1.25vw;
        vertical-align: bottom;
    }
</style>