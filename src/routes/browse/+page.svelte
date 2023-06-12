<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PlacemarkSearch from "$lib/PlacemarkSearch.svelte";
    import Notification from "$lib/Notification.svelte";
    import PlacemarkView from "$lib/PlacemarkView.svelte";
    import {onMount} from "svelte";
    import {loading, user} from "../../stores";
    import {placemarkService} from "../../services/placemark-service";
    import type {Category, Placemark} from "../../services/placemark-types";

    let placemarks: Placemark[] = [], myCategories: Category[] = [], searchValue = "";
    $: filteredPlacemarks = placemarks.filter(placemark => placemark.name.toLowerCase().includes(searchValue.toLowerCase()) || placemark.description.toLowerCase().includes(searchValue.toLowerCase()));

    onMount(async () => {
        $loading = true;
        let users = await placemarkService.getUsers();
        placemarks = await placemarkService.getPlacemarks();
        placemarks = placemarks.filter(placemark => placemark.category.user !== $user._id);
        placemarks.forEach(placemark => {
            let user = users.filter(user => user._id === placemark.category.user);
            placemark.category.user = user[0];
        });
        myCategories = await placemarkService.getCategories();
        myCategories = myCategories.filter(category => category.user === $user._id);
        $loading = false;
    });
</script>

<NavBar loggedIn=true active="browse" />

<div class="container">
    <h1 class="title"><i class="fas fa-globe"></i> Browse placemarks created by other users</h1>
    <div class="block" style="width:300px;">
        <PlacemarkSearch bind:searchValue={searchValue} />
    </div>

    {#if placemarks.length !== 0 && filteredPlacemarks.length === 0 && !$loading && searchValue !== ""}
        <Notification message="No placemarks found." type="warning" icon="circle-exclamation" />
    {/if}

    {#if placemarks.length === 0}
        <Notification message="There are no placemarks yet." type="warning" icon="circle-exclamation" />
    {/if}

    {#each filteredPlacemarks as placemark}
        <PlacemarkView categories={myCategories} context="browse" placemark={placemark}/>
    {/each}
</div>