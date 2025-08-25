<script lang='ts'>
</script>

<div class="wrapper">
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .wrapper {
        color: white;
        font-size: .75vw;
        min-height: 90vh;
        min-width: 60ch;
        max-width: 40%;
        margin: auto;
        margin-top: 2vh;
        background-color: var(--lighter-background-color);
        border: 2px outset var(--secondary-color);
        display: flex;
    }

    @media (max-width: 1300px) {
    .wrapper {
        max-width: 80%;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        padding: 2rem;
        text-align: center;
        }

    :global(.wrapper h1),
    :global(.wrapper h2),
    :global(.wrapper h3)
    {
        color: var(--main-color);
    }

    :global(.section) {
        margin-top: 1vh;
    }

    :global(.text-section) {
        text-align: left;
        width: 100%;
    }

    :global(button.submit-button) {
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border-radius: 24px;
        background-color: var(--main-color);
        border: none;
        color: white;
    }

    :global(button.submit-button:hover) {
        background-color: var(--button-hover-color);
    }

    :global(a) {
        color: var(--main-color);
    }

</style>
