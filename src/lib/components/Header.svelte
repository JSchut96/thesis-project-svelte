<script lang="ts">
    import {page} from "$app/state"
    import { hasConfirmedInstructions } from '$lib/stores/instruction';
	import { goto } from '$app/navigation';

    let isOnInstructionsPage = $derived(page.url.pathname.includes('instructions'));
    let isOnLayoutPage = $derived(['grid', 'carousel', 'honeycomb'].some(segment => page.url.pathname.includes(segment)));
    let isOnPreferencePage = page.url.pathname.includes("preference");

    async function startTask() {
		const res = await fetch('/api/task-redirect');
		if (res.ok) {
			const data = await res.json();
			if (data.redirect) {
				goto(data.redirect);
			}
		} else {
			console.error('Failed to fetch redirect URL');
		}
	}
</script>

<div class="header-container">
    <div class="main-header">
        {#if isOnInstructionsPage}
            <button
                class="submit-button"
                on:click={startTask}
                disabled={!$hasConfirmedInstructions}
            >
                Start Task
            </button>
        {:else if isOnLayoutPage}
            <h2>Add any number of movies to your Watchlist. Then pick one you would like to watch from the Watchlist to finish the task. </h2>
        {:else if isOnPreferencePage}
            <h2>Select at least 5 movies you like to proceed.</h2>
        {/if}
    </div>
</div>

<style>
    .header-container{
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        height: auto;
        min-height: 70px;
        background-color: var(--background-color);
        color: white;
        z-index: 5;
    }

    .main-header{
        height: 68px;
        padding: 0 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-image: linear-gradient(180deg, rgba(0,0,0,.7) 10%, transparent);
        z-index: 2;
    }

    h2 {
        font-size: max(1rem, 1vw);
    }

    button {
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 24px;
        background-color: var(--main-color);
        border: none;
        color: white;
    }

    button:disabled {
        cursor: not-allowed;
        background-color: gray;
    }

    h2 {
        color: var(--main-color)
    }
</style>