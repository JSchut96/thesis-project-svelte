<script lang="ts">
    import Content from '$lib/components/Content.svelte';
    import { onMount } from 'svelte';
    import { preloadData } from '$app/navigation';

    onMount(() => {
        preloadData('/preference');
    })    

    let formData = {
        age: '',
        gender: '',
        nationality: '',
        streamingExperience: '',
        hoursPerWeek: '',
        colorBlindness: '',
        inputDevice: ''
    };
</script>
    <Content>
        <h1>Almost ready</h1>
        <p>Before you begin, please fill in the following questions</p>

        <form method="POST" class="form-container">
            <div class="form-group">
                <label for="age">What is your age?</label>
                <input id="age" name="age" type="number" bind:value={formData.age} min="18" max="100" required />
            </div>

            <div class="form-group">
                <label for="gender">What is your gender?</label>
                <select id="gender" name="gender" bind:value={formData.gender} required>
                    <option value="" disabled selected>Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="nationality">What is your nationality?</label>
                <input id="nationality" name="nationality" type="text"  bind:value={formData.nationality} pattern="[A-Za-z\s]+" required />
            </div>

            <div class="form-group">
                <label for="streamingExperience">
                    How experienced are you at using video streaming services (e.g., Netflix, Disney+, HBO Max)?
                </label>
                <div class="likert-row">
                <span class="adjective negative">Extremely Inexperienced</span>
                <div class="likert-scale">
                    {#each [1, 2, 3, 4, 5] as value}
                        <label for={"experience-" + value}>
                            <input
                                id={"experience-" + value}
                                type="radio"
                                name="streamingExperience"
                                value={String(value)}
                                bind:group={formData.streamingExperience}
                                required
                            />
                            <span class="sr-only">{value}</span>
                        </label>
                    {/each}
                </div>
                <span class="adjective positive">Extremely Experienced</span>
                </div>
            </div>

            <div class="form-group">
                <label for="hours">How many hours per week do you spend on such streaming services?</label>
                <input id="hours" name="hoursPerWeek" type="number" bind:value={formData.hoursPerWeek} min="0" max="100" required />
            </div>

            <div class="form-group">
                <label for="colorBlindness">Do you have any color vision deficiencies?</label>
                <select
                    id="colorBlindness"
                    name="colorBlindness"
                    bind:value={formData.colorBlindness}
                    required
                >
                    <option value="" disabled selected>Select an option</option>
                    <option value="none">No color blindness</option>
                    <option value="red">Protanopia (red-blind)</option>
                    <option value="green">Deuteranopia (green-blind)</option>
                    <option value="blue">Tritanopia (blue-blind)</option>
                    <option value="complete">Achromatopsia (complete color blindness)</option>
                    <option value="other">Other / Unsure</option>
                </select>
            </div>

            <div class="form-group">
                <label for="inputDevice">Which input device will you be using during the experiment?</label>
                <select id="inputDevice" name="inputDevice" bind:value={formData.inputDevice} required>
                    <option value="" disabled selected>Select your device</option>
                    <option value="mouse">Mouse</option>
                    <option value="touchpad">Touchpad</option>
                </select>
            </div>

            <button class="submit-button" type="submit">Submit</button>
        </form>
    </Content>

<style>

    label {
        color: var(--main-color);
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    .form-container {
        max-width: 500px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    input,
    select {
        width: 100%;
        font-size: clamp(0.875rem, 1vw + 0.2rem, 1.25rem);
        padding: clamp(0.3rem, 0.5vw + 0.2rem, 0.75rem);
        margin-top: 0.25rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-family: inherit;
        resize: vertical;
    }

    button:hover {
        background-color: var(--button-highlight-color);
    }

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