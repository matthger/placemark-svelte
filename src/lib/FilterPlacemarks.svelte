<script lang="ts">
    import {onMount} from "svelte";
    import {dropdownHelper} from "../helper/dropdown.js";
    import type {Category} from "../services/placemark-types";

    export let categories: Category[] = [];
    export let activeCategory: Category | null = null;

    onMount(() => {
       dropdownHelper.init();
    });

    function filterCategories(categoryId) {
        activeCategory = (categoryId) ? categories.find(category => category._id === categoryId) : null;
    }
</script>

<div class="dropdown">
    <div class="dropdown-trigger">
        <button class="button is-justify-content-space-between" style="min-width: 250px;" aria-haspopup="true" aria-controls="categoryDropdown">
            <span>{#if activeCategory}{ activeCategory.name }{:else}All Placemarks{/if} </span>
            <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
        </button>
    </div>
    <div class="dropdown-menu" id="categoryDropdown" role="menu">
        <div class="dropdown-content">
            <a on:click={() => {filterCategories(null)}} class="dropdown-item">
                All Placemarks
            </a>
            {#each categories as category}
                <a class="dropdown-item" on:click={() => {filterCategories(category._id)}}>
                    {category.name}
                </a>
            {/each}
        </div>
    </div>
</div>