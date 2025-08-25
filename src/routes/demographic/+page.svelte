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
        netflixExperience: '',
        disneyExperience: '',
        hoursPerWeek: '',
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
                <label for="netflixExperience">How much experience do you have using the service Netflix?</label>
                <select name="netflixExperience" bind:value={formData.netflixExperience} required>
                    <option value="" disabled selected>Select one</option>
                    <option value="none">None</option>
                    <option value="little">A little</option>
                    <option value="some">Some experience</option>
                    <option value="experienced">Experienced</option>
                    <option value="expert">Expert</option>
                </select>
            </div>

            <div class="form-group">
                <label for="disneyExperience">How much experience do you have using the service Disney+?</label>
                <select name="disneyExperience" bind:value={formData.disneyExperience} required>
                    <option value="" disabled selected>Select one</option>
                    <option value="none">None</option>
                    <option value="little">A little</option>
                    <option value="some">Some experience</option>
                    <option value="experienced">Experienced</option>
                    <option value="expert">Expert</option>
                </select>
            </div>

            <div class="form-group">
                <label for="hours">How many hours per week do you spend on streaming services like Netflix or Disney+?</label>
                <input id="hours" name="hoursPerWeek" type="number" bind:value={formData.hoursPerWeek} min="0" max="100" required />
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
</style>