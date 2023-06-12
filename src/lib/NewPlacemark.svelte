<script lang="ts">
    import {placemarkService} from "../services/placemark-service";
    import {onMount} from "svelte";
    import {modalHelper} from "../helper/modal.js";
    import type {Category, Placemark} from "../services/placemark-types";

    export let categories: Category[] = [];

    let name = '';
    let description = '';
    let lat = '';
    let lng = '';
    let category;

    async function addPlacemark() {
        let placemark : Placemark = {
            name: name,
            description: description,
            lat: lat,
            lng: lng,
            category: category,
            img: ''
        } as Placemark;
        await placemarkService.createPlacemark(placemark);
        window.location.reload();
    }

    onMount(() => {
        modalHelper.init();
    });
</script>

<a class="button is-link is-info js-modal-trigger" data-target="add">
    <i class="fas fa-plus mr-2"></i> New Placemark
</a>

<div id="add" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{#if categories.length}Add placemark{:else}No categories found!{/if}</p>
            <button class="delete" aria-label="close"></button>
        </header>
        {#if categories.length}
            <section class="modal-card-body">
                <div class="field">
                    <label for="name" class="label">Name</label>
                    <div class="control has-icons-left">
                        <input class="input" id="name" type="text" placeholder="Enter a name for the new placemark" name="name" bind:value={name} required>
                        <span class="icon is-small is-left">
                          <i class="fas fa-map-pin"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="description" class="label">Description</label>
                    <div class="control has-icons-left">
                        <input class="input" id="description" type="text" placeholder="Enter a description for the new placemark" name="description" bind:value={description} required>
                        <span class="icon is-small is-left">
                          <i class="fas fa-file"></i>
                        </span>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label for="lat" class="label">Lat</label>
                            <div class="control has-icons-left">
                                <input class="input" id="lat" type="text" placeholder="Enter a lat value" name="lat" bind:value={lat} required>
                                <span class="icon is-small is-left">
                                  <i class="fas fa-up-down"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="lng" class="label">Lng</label>
                            <div class="control has-icons-left">
                                <input class="input" id="lng" type="text" placeholder="Enter a lng value" name="lng" bind:value={lng} required>
                                <span class="icon is-small is-left">
                                  <i class="fas fa-left-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="category" class="label">Category</label>
                    <div class="control has-icons-left">
                        <div class="select">
                            <select name="category" id="category" required style="min-width: 250px;" bind:value={category}>
                                {#each categories as category}
                                <option value="{category._id}">{category.name}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="icon is-small is-left">
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" on:click={addPlacemark}><i class="fas fa-floppy-disk mr-2"></i> Save</button>
            </footer>
        {:else}
        <section class="modal-card-body">
            <p class="subtitle is-6">Please create a category first.</p>
        </section>
        {/if}
    </div>
</div>