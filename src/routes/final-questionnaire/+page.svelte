<script lang="ts">
    import Content from '$lib/components/Content.svelte';

    let layouts = ['grid', 'carousel', 'honeycomb'];

    let layoutRank1 = '';
    let layoutRank2 = '';
    let layoutRank3 = '';

    let form: HTMLFormElement;

    function handleSubmit(event: Event) {
        const selected = [layoutRank1, layoutRank2, layoutRank3];

        const unique = new Set(selected);

        if (unique.size !== 3) {
            alert("Please select a different layout for each rank.");
            return;
        }

        form.submit();
    }
</script>

    <Content>
    <h1>Final Questionnaire</h1>
    <p></p>
    <form method="POST" bind:this={form} on:submit|preventDefault={handleSubmit}>
        <div class="section">
        <h3>Rank the three layouts from best (1) to worst (3)*</h3>
        <table>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Layout</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1 (Best)</td>
                <td>
                    <select name="layoutRank1" bind:value={layoutRank1} required>
                        <option value="" disabled selected>Select layout</option>
                        {#each layouts as layout}
                            <option value={layout}>
                                {layout}
                            </option>
                        {/each}
                    </select>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>
                <select name="layoutRank2" bind:value={layoutRank2} required>
                    <option value="" disabled selected>Select layout</option>
                    {#each layouts as layout}
                        <option value={layout}>
                            {layout}
                        </option>
                    {/each}
                </select>
                </td>
            </tr>
            <tr>
                <td>3 (Worst)</td>
                <td>
                <select name="layoutRank3" bind:value={layoutRank3} required>
                    <option value="" disabled selected>Select layout</option>
                    {#each layouts as layout}
                        <option value={layout}>
                            {layout}
                        </option>
                    {/each}
                </select>
                </td>
            </tr>
            </tbody>
        </table>
        </div>

        <div class="section">
            <h3>Why did you decide on this ranking?*</h3>
            <textarea name="reasoning" rows="4" required></textarea>
        </div>

        <div class="section">
            <h3>Could you list any pros or cons of each layout?*</h3>
            <textarea name="prosCons" rows="4" required></textarea>
        </div>

        <div class="section">
            <h3>Do you have any other remarks? (Optional)</h3>
            <textarea name="remarks" rows="3"></textarea>
        </div>

        <button type="submit" class="button">Submit</button>
    </form>
</Content>

<style>
  .section {
    margin-top: 1.5rem;
    text-align: left;
    width: 100%;
  }

  select, textarea {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    margin-top: 0.25rem;
  }

  table {
    margin-top: 1rem;
    width: 100%;
    border-spacing: 0.5rem;
  }

  .button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: var(--main-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .button:hover {
    background-color: rgba(255,19,30,255);
  }
</style>