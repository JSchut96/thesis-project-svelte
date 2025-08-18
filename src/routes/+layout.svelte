<script>
    import '../app.css'
    import Header from '$lib/components/Header.svelte'
    
	let { children } = $props();
</script>

<Header />

<div class="main-view">
    {@render children()}
</div>


<style>
    .main-view{
        position: relative;
        z-index: 0;
    }
</style>
