<script lang="ts">
    import Content from '$lib/components/Content.svelte';
    import { onMount } from 'svelte';
    import { preloadData } from '$app/navigation';
    import { hasConfirmedInstructions } from '$lib/stores/instruction';

    export let data;

    const layoutIndex = data.layoutIndex;
    const layoutOrder = data.layoutOrder;

    onMount(() => {
        switch (layoutOrder[layoutIndex]){
            case 'A':
                preloadData('/grid');
                break;
            case 'B':
                preloadData('/carousel');
                break;
            case 'C':
                preloadData('/honeycomb');
                break;
            default:
                console.log("Could not preload Data")
                break;
        }
    })    
</script>

<Content >
    <h1> Instructions </h1>
    <div class="section text-section">
        {#if layoutIndex == 0}
            <p>
                Now that all those questions are out of the way, let's get ready for the first task. Please read the instructions below carefully before continuing.
            </p>
        {:else if layoutIndex == 1}
            <p>
                You've completed the first task! Now let's get ready for the second one. Don't forget to check the navigation tips below for the next layout.
            </p>
        {:else if layoutIndex == 2}
            <p>
                You've completed the second task and are ready for the final one! Don't forget to read the navigation tips below before continuing.
            </p>
        {/if}
    </div>
    
    <div class="section text-section">
        {#if layoutIndex == 0}
            <h2>What is going to happen?</h2>

            <p><strong>You will be asked to complete three tasks.</strong><br>
            During each task, you'll interact with a different layout displaying movie recommendations based on the movies you've selected earlier.</p>

            <p>You can freely explore each layout by hovering over movie posters. This will reveal a popup with additional information about the movie.</p>

            <ul>
                <li>You can <strong>mark a movie as part of your "Watchlist"</strong> by clicking the <strong>plus (+) button</strong> in the popup.</li>
                <li>This will add a <strong>star symbol</strong> to the poster of the movie.</li>
                <li>To <strong>remove a movie</strong> from your "Watchlist", click the same button again (now shown as a <strong>minus (–) symbol</strong>).</li>
            </ul>

            <p>Once you've explored the recommendations and have marked as many movies as part of your "Watchlist" as you desire, <strong>choose one movie you have marked</strong> and click the <strong>Play button</strong> (next to the add/remove button) to complete the task.</p>

            <p>After completing each task, there will be a small questionnaire to fill in. After all three tasks and their questionnaires, there will be one final questionnaire. After submitting this, you are done.</p>
        {:else}
            <h2>Task reminder</h2>
            <p><strong>You will be asked to complete three tasks.</strong><br>
            During each task, you'll interact with a different layout displaying movie recommendations based on the movies you've selected earlier.</p>

            <p>You can freely explore each layout by hovering over movie posters. This will reveal a popup with additional information about the movie.</p>

            <ul>
                <li>You can <strong>mark a movie as part of your "Watchlist"</strong> by clicking the <strong>plus (+) button</strong> in the popup.</li>
                <li>This will add a <strong>star symbol</strong> to the poster of the movie.</li>
                <li>To <strong>remove a movie</strong> from your "Watchlist", click the same button again (now shown as a <strong>minus (–) symbol</strong>).</li>
            </ul>

            <p>Once you've explored the recommendations and have marked as many movies as part of your "Watchlist" as you desire, <strong>choose one movie you have marked to watch</strong> and click the <strong>Play button</strong> (next to the add/remove button) to complete the task.</p>

            <p>Don't forget that there will be a questionaire after completing all three tasks.</p>
        {/if}
    </div>
    <div class="section text-section">
        <h2>Navigation tips for the next layout</h2>
        {#if layoutOrder[layoutIndex] == 'A'}
            <p>
                Your next layout will be a rectangular grid. Above the grid, there will be a menu you can use to switch to the recommendations for a different genre.
            </p>
        {:else if layoutOrder[layoutIndex] == 'B'}
            <p>
                Your next layout will consist of multiple carousels. Each carousel corresponds to a different genre. You can traverse each carousel by using the buttons on the right and left side of the corresponding carousel.
            </p>
        {:else if layoutOrder[layoutIndex] == 'C'}
            <p>
                Your next layout will be a honeycomb grid. You can move the visible section of the honeycomb grid around by clicking and holding the left mouse button inside the section containing the honeycomb and then dragging your mouse around.
                You can stop dragging by releasing the left mouse button.  
            </p>
        {/if}              
    </div>

    <div class="section">
        {#if layoutIndex == 0}
            <p>Ready to begin? Great! <br> Check the box below and start the task by pressing the button at the top of the screen.</p>
        {:else}
            <p>Ready to continue? <br> You can start the next task by checking the box below and pressing the button at the top of the screen.</p>
        {/if}
        
        <label style="display: block; margin-top: 1rem;">
            <input type="checkbox" bind:checked={$hasConfirmedInstructions} />
            I have read the instructions
        </label>
    </div>
</Content>


<style>
</style>

