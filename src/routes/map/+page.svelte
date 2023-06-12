<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import {placemarkService} from "../../services/placemark-service";
    import {onMount} from "svelte";
    import {user} from "../../stores";
    import {getMarkerLayer} from "../../services/placemark-utils";
    import type {Category} from "../../services/placemark-types";


    let map: PlacemarkMap;

    onMount(async () => {
        placemarkService.reload();
        const categories : Category[] = await placemarkService.getUserCategories($user._id);
        for (let category of categories) {
            let categoryLayer = getMarkerLayer(category.name, category.placemarks);
            map.populateLayer(categoryLayer);
        }
    });
</script>

<svelte:head>
    <title>Placemark - My map</title>
</svelte:head>

<NavBar loggedIn={true} active="map" />

<div class="container">
    <h1 class="title"><i class="fas fa-map-location-dot mr-2"></i> Map</h1>
    <PlacemarkMap bind:this={map} />
</div>