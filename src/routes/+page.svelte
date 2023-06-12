<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PlacemarkInfoText from "$lib/PlacemarkInfoText.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(() => {
        if (localStorage.getItem("user")) goto("/user");
    })
</script>

<svelte:head>
    <title>Welcome to Placemark</title>
</svelte:head>

<NavBar />

<PlacemarkInfoText context="main" />