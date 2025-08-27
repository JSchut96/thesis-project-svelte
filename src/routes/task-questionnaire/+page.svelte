<script lang="ts">
    import Content from '$lib/components/Content.svelte';

    export let data;
    const layout = data.layout;

    let likertRatings: any = {
        obstructive: { value: '' },
        complicated: { value: '' },
        inefficient: { value: '' },
        confusing: { value: '' },
        boring: { value: '' },
        notInteresting: { value: '' },
        conventional: { value: '' },
        usual: { value: '' },
    };

    const adjectivePairs = [
        ['obstructive', 'supportive', 'This layout supported me in finding movies I wanted to watch.'],
        ['complicated', 'easy', 'This layout was easy to understand.'],
        ['inefficient', 'efficient', 'This layout made it efficient to find suitable recommendations.'],
        ['confusing', 'clear', 'This layout made it clear where to look for good recommendations.'],
        ['boring', 'exciting', 'This layout felt exciting to use.'],
        ['not interesting', 'interesting', 'This layout felt interesting while browsing through options.'],
        ['conventional', 'inventive', 'This layout felt more inventive than typical recommendation interfaces.'],
        ['usual', 'leading edge', 'This layout felt leading-edge.']
    ];
</script> 

<Content>
    <h1>{layout} Task Questionnaire</h1>
    <div class="section">
        <p>
            For each statement, rate the {layout} layout by selecting the point on the scale that best reflects your impression between the two adjectives.
            The scale ranges from 1 (e.g., Obstructive) to 7 (e.g., Supportive) with 4 as neutral. 
        </p>
    </div>    
    
    <div class="section">
        <form method="POST">
            {#each adjectivePairs as [negative, positive, question]}
            <div>
                <h3>{question}</h3>
                <div class="likert-row">
                <span class="adjective negative">{negative}</span>
                <div class="likert-scale">
                    {#each [1, 2, 3, 4, 5, 6, 7] as value}
                    <label>
                        <input
                        type="radio"
                        name={negative}
                        value={value}
                        bind:group={likertRatings[negative]}
                        required
                        />
                    </label>
                    {/each}
                </div>
                <span class="adjective positive">{positive}</span>
                </div>
            </div>
            {/each}
            <button class="submit-button" type="submit">Submit Ratings</button>
        </form>
    </div>
</Content>

<style>
    .likert-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .likert-row span {
        width: 120px;
        text-align: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .likert-row .adjective {
        font-size: clamp(1rem, 1vw + 0.5rem, 1.25rem);
    }

    .likert-row .negative {
        text-align: right;
    }

    .likert-row .positive {
        text-align: left;
    }

    .likert-scale {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .likert-scale label {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .likert-scale input[type="radio"] {
        transform: scale(1.2);
        cursor: pointer;
        accent-color: var(--secondary-color);
    }
</style>