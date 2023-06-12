<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import {loading, user} from "../../stores";
    import Notification from "$lib/Notification.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service";
    import PlacemarkSearch from "$lib/PlacemarkSearch.svelte";
    import FilterPlacemarks from "$lib/FilterPlacemarks.svelte";
    import NewPlacemark from "$lib/NewPlacemark.svelte";
    import PlacemarkView from "$lib/PlacemarkView.svelte";
    import { page } from '$app/stores';
    import type {Category, Placemark} from "../../services/placemark-types";

    let placemarks: Placemark[] = [];
    let categories: Category[] = [];
    let activeCategory: Category | null = null;
    let searchValue = "";

    $: filteredPlacemarks = placemarks.filter(placemark => placemark.name.toLowerCase().includes(searchValue.toLowerCase()) || placemark.description.toLowerCase().includes(searchValue.toLowerCase()));

    onMount(async () => {
        $loading = true;
        placemarks = await placemarkService.getPlacemarksByUserId($user._id);
        categories = await placemarkService.getUserCategories($user._id);

        if ($page.url.searchParams.has('filter')) {
            const filter = $page.url.searchParams.get('filter');
            activeCategory = categories.find(category => category._id === filter);
        }
        $loading = false;
    });
</script>

<svelte:head>
    <title>Placemark - My placemarks</title>
</svelte:head>

<NavBar loggedIn={true} active="placemarks" />

<div class="container">
    <h1 class="title"><small class="has-tooltip-right" data-tooltip="Count: {placemarks.length}"><i class="fas fa-map-pin mr-2"></i></small>Placemarks</h1>

    <div class="is-flex block is-justify-content-space-between">
        <div class="filter-tools is-flex">
            <PlacemarkSearch bind:searchValue={searchValue} />
            <FilterPlacemarks bind:activeCategory={activeCategory} categories={categories} />
        </div>
        <NewPlacemark categories={categories} />
    </div>

    {#if placemarks.length !== 0 && filteredPlacemarks.length === 0 && !$loading && searchValue !== ""}
        <Notification message="No placemarks found." type="warning" icon="circle-exclamation" />
    {/if}

    {#if (placemarks.length === 0 && !$loading && activeCategory === null) || (activeCategory !== null && placemarks.filter(placemark => placemark.category._id === activeCategory._id).length === 0)}
        <Notification message="There are no placemarks yet." type="warning" icon="circle-exclamation" />
    {/if}

    {#each filteredPlacemarks as placemark}
        {#if (activeCategory === null) || (placemark.category._id === activeCategory._id)}
            <PlacemarkView context="my" categories={categories} placemark={placemark}  bind:activeCategory={activeCategory} />
        {/if}
    {/each}
</div>