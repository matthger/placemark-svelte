<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import NewCategory from "$lib/NewCategory.svelte";
    import Notification from "$lib/Notification.svelte";
    import CategoryView from "$lib/CategoryView.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service";
    import {user, loading} from "../../stores";
    import {goto} from "$app/navigation";
    import type {Category} from "../../services/placemark-types";

    let categories: Category[] = [];

    onMount(async () => {
        if (!localStorage.getItem("user")) goto("/login");
        $loading = true;
        categories = await placemarkService.getUserCategories($user._id);
        $loading = false;
    });
</script>

<svelte:head>
    <title>Placemark - My categories</title>
</svelte:head>

<NavBar loggedIn={true} active="categories" />

<div class="container">
    <div class="columns">
        <div class="column">
            <div class="is-sticky">
                <h1 class="title"><small><i class="fas fa-plus mr-2"></i></small>New category</h1>
                <NewCategory />
            </div>
        </div>
        <div class="column">

            <h1 class="title"><small class="has-tooltip-right" data-tooltip="Count: {categories.length}"><i class="fas fa-star mr-2"></i></small>Categories</h1>
            {#if categories.length === 0 && !$loading}
                <Notification message="You have no categories yet." type="warning" icon="circle-exclamation" />
            {/if}
            {#each categories as category}
                <CategoryView category={category} />
            {/each}
        </div>
    </div>
</div>