<script lang="ts">
    import Content from '$lib/components/Content.svelte';
    import {page} from '$app/state';
</script>

<Content>
    <h1>{page.status} {page.error?.message}</h1>
    {#if page.status == 400}        
        <p>
            Seems like you already finished this task. Did you use the back button by chance? You can probably continue by going forward again.
            Otherwise, please inform me at <a href="mailto:j.schut@students.uu.nl">j.schut@students.uu.nl</a>
            that an error has occured and you could not complete the experiment. Please also provide around which time this error occured.
            For now the experiment has been aborted. You can close this window.
        </p>
    {:else if page.status == 500}
        <p>
            Sadly, something seem to have gone wrong. Please inform me at <a href="mailto:j.schut@students.uu.nl">j.schut@students.uu.nl</a>
            that an error has occured and you could not complete the experiment. Please also provide around which time this error occured.
            For now the experiment has been aborted. You can close this window.
        </p>
    {/if}
    
</Content>