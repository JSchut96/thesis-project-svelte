<script lang="ts">
    import Content from '$lib/components/Content.svelte';
    let error = '';

    export let form: { error?: string };

    if (form?.error) {
        error = form?.error
    }
</script>

<Content>
    <h1>Welcome</h1>
    <p>And thank you for your interest in participating in this study.</p>

    <div class="text-section">
        <h2>IMPORTANT - What do you need to participate in this study?</h2>
        <p>In order to participate in this study, you will need the following:</p>
        <ul>
            <li>A laptop or desktop with touchpad or mouse. (i.e. NO phone or tablet)</li>
            <li>Enough time to complete the full study in one go (Up to x minutes)</li> <!-- Time to be determined later-->
        </ul>
    </div>

    <div class="text-section">
        <h2>What is the goal of this study?</h2>
        <p>This study aims to better understand how different ways of showing movie
            recommendations affect how people experience finding something to watch on a streaming service.</p>
    </div>

    <div class="text-section">
        <h2>What can you expect while participating in this study?</h2>
        <p>You will be asked to perform a task while navigating three different layouts for a video streaming service.
            After each task, you will be answering a short questionnaire about your experience with the layout.
            After all tasks are completed, you will be asked to respond to a list of questions.
        </p>
    </div>

    <div class="text-section">
        <h2>What happens to the data that is collected?</h2>
        <p>If you consent to participating in the study, the data you provide will be analysed and stored anonymously in a secure database. 
        This anonymous data may be made available after the completion of the study to researchers and other research users upon request via a 
        secured data repository. 
        <br />
        Participation is voluntary. We are only allowed to collect your data for this study if you consent to this. 
        If you decide not to participate, you do not have to take any further action. 
        If you do decide to participate, you can still change your mind and stop participating during the study. 
        If you decide to stop participating during the study, the data collected up to the point of dropping out will be deleted.
        </p>
    </div>

    <div class="text-section">
        <h2>How can you contact us?</h2>
        <p>If you have any questions or concerns about this research, please contact me at <a href="mailto:j.schut@students.uu.nl">j.schut@students.uu.nl</a>, 
        or my supervisor Dr. A. Chatzimparmpas at <a href="mailto:a.chatzimparmpas@uu.nl">a.chatzimparmpas@uu.nl</a>.
        </p>
    </div>
    <p>Want to participate? That's amazing!<br> After giving consent you can continue with the button below.</p>
    <form method="POST">
        <div class="consent">
            <label for="consent">
                <input type="checkbox" name="consent" value="true" />
                Yes, I have read and understood the information provided above and I consent to my data being used for the purposes of 
                scientific research as described above.
            </label>
        </div>          
        
        <p class="error">{error}</p>
        
        <button class="submit-button" type="submit">
            Participate
        </button>
    </form>
</Content>


<style>
    .error {
        min-height: 1.5em;
        color: var(--main-color);
    }

    label {
        font-style: italic;
    }

    input {
        accent-color: var(--main-color);
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }   
</style>

