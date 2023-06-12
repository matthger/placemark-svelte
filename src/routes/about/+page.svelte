<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PlacemarkInfoText from "$lib/PlacemarkInfoText.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(() => {
        if (!localStorage.getItem("user")) goto("/login");
    })
</script>

<svelte:head>
    <title>Placemark - About</title>
</svelte:head>

<NavBar loggedIn=true active="about" />

<PlacemarkInfoText context="about" />