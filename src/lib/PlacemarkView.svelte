<script lang="ts">
    import {onMount} from "svelte";
    import {modalHelper} from "../helper/modal.js";
    import ImageUpload from "$lib/ImageUpload.svelte";
    import {loading} from "../stores";
    import {placemarkService} from "../services/placemark-service";
    import {goto} from "$app/navigation";
    import type {Category, Placemark} from "../services/placemark-types";

    export let placemark: Placemark = {} as Placemark;
    export let categories: Category[];
    export let context = '';

    export let activeCategory: Category = {} as Category;

    let placemarkimg;
    let categoryimg;
    let imageAction;
    let importCategory;

    let editName = placemark.name;
    let editDescription = placemark.description;
    let editLat = placemark.lat;
    let editLng = placemark.lng;
    let editCategory = placemark.category._id;

    $: placemarkimg = (placemark.img) ? placemark.img : '/imageplaceholder.png';
    $: categoryimg = (placemark.category.img) ? placemark.category.img : '/imageplaceholder.png';
    $: imageAction = (context === 'my') ? 'upload-' : 'image-';
    $: imageAction += placemark._id;

    onMount(async () => {
        modalHelper.init();
    });

    async function placemarkHandler(type) {
        $loading = true;
        let selectedPlacemark: Placemark;
        switch (type) {
            case 'delete':
                await placemarkService.deletePlacemark(placemark._id);
                window.location.reload();
                break;
            case 'edit':
                selectedPlacemark  = {
                    name: editName,
                    description: editDescription,
                    lat: editLat,
                    lng: editLng,
                    category: editCategory,
                    img: placemark.img
                } as Placemark;
                await placemarkService.editPlacemark(placemark._id, selectedPlacemark);
                window.location.reload();
                break;
            case 'add':
                selectedPlacemark = {
                    name: placemark.name,
                    description: placemark.description,
                    lat: placemark.lat,
                    lng: placemark.lng,
                    category: importCategory,
                    img: placemark.img
                } as Placemark;
                await placemarkService.createPlacemark(selectedPlacemark);
                goto("/placemarks?filter=" + importCategory);
                break;
        }
        $loading = false;
    }
</script>

<div class="box placemark-view" data-id="{placemark._id}">
    <article class="media is-align-items-center">
        <div class="media-left">
            <img src="{placemarkimg}" alt="Placemark" width="150" height="150" class="js-modal-trigger image" data-target="{imageAction}">
        </div>
        <div class="media-content">
            <div class="content">
                <strong class="is-size-4 name">{placemark.name}</strong>
                <div class="columns">
                    <div class="column">
                        <p>
                            <small><strong>Description: </strong> <span class="description">{placemark.description}</span></small>
                            <br>
                            <small><strong>Lat: </strong> {placemark.lat}</small>
                            <br>
                            <small><strong>Lng: </strong> {placemark.lng}</small>
                            {#if context === "browse"}
                                <br>
                                <small><strong>User: </strong> {placemark.category.user.firstName} {placemark.category.user.lastName}</small>
                            {/if}
                        </p>
                    </div>
                    <div class="column is-flex is-justify-content-center" style="gap: .5rem;">
                        {#if context === 'my'}
                            <div class="category placemark-badge is-flex is-align-items-center is-flex-direction-column">
                                <a on:click={() => {activeCategory = placemark.category}} class="image is-96x96 is-flex is-align-items-center" style="width: 80px; height: 80px;">
                                    <img src="{categoryimg}" width="80" height="80" alt="Category" class="is-rounded" style="object-fit: contain;">
                                </a>
                                {placemark.category.name}
                            </div>
                        {/if}
                        <div class="country placemark-badge is-flex is-align-items-center is-flex-direction-column">
                            {#if placemark.weather}
                            <img src="{placemark.country.flag}" alt="Country flag" width="80" height="80">
                            {placemark.country.city} ({placemark.country.code})
                            {/if}
                        </div>
                        <div class="weather placemark-badge is-flex is-align-items-center is-flex-direction-column">
                            {#if placemark.weather}
                                <img src="{placemark.weather.icon}" alt="Weather icon" width="80" height="80">
                                {placemark.temp.temp} °C
                            {:else}
                                <div class="is-flex is-align-items-center is-justify-content-center" style="height: 80px; width: 80px;">
                                    <i class="fas fa-bolt" style="font-size:25px;"></i>
                                </div>
                                No weather data
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    {#if context === "my"}
                        <a class="js-modal-trigger level-item" aria-label="edit" data-target="edit-{placemark._id}">
                            <span class="icon is-small">
                              <i class="fas fa-pen" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="js-modal-trigger level-item" aria-label="delete" data-target="delete-{placemark._id}">
                            <span class="icon is-small">
                              <i class="fas fa-trash" aria-hidden="true"></i>
                            </span>
                        </a>
                    {:else}
                        <a class="js-modal-trigger level-item" aria-label="edit" data-target="add-{placemark._id}">
                            <span class="icon is-small">
                              <i class="fas fa-plus" aria-hidden="true"></i>
                            </span>
                        </a>
                    {/if}
                </div>
            </nav>
        </div>
    </article>
</div>

<div id="edit-{placemark._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit placemark: <strong>{placemark.name}</strong></p>
            <button class="delete" aria-label="close"></button>
        </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="name" class="label">Name</label>
                    <div class="control has-icons-left">
                        <input class="input" id="name" type="text" placeholder="Enter a new name for the placemark" name="name" bind:value="{editName}" required>
                        <span class="icon is-small is-left">
                          <i class="fas fa-map-pin"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="description" class="label">Description</label>
                    <div class="control has-icons-left">
                        <input class="input" id="description" type="text" placeholder="Enter a new description for the placemark" bind:value="{editDescription}" name="description" required>
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
                                <input class="input" id="lat" type="text" placeholder="Enter a new lat value" bind:value={editLat} name="lat" required>
                                <span class="icon is-small is-left">
                                  <i class="fas fa-up-down"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="lng" class="label">Lng</label>
                            <div class="control has-icons-left">
                                <input class="input" id="lng" type="text" placeholder="Enter a new lng value" bind:value={editLng} name="lng" required>
                                <span class="icon is-small is-left">
                                  <i class="fas fa-left-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="category-{placemark._id}" class="label">Category</label>
                    <div class="control has-icons-left">
                        <div class="select">
                            <select name="category" id="category-{placemark._id}" style="min-width: 250px;" bind:value={editCategory}>
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
                <button class="button is-success" on:click={() => placemarkHandler("edit")}><i class="fas fa-pen mr-2"></i> Save changes</button>
            </footer>
    </div>
</div>

<div id="delete-{placemark._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Are you sure?</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            The placemark <strong>{placemark.name}</strong> will be deleted permanently.
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" on:click={() => placemarkHandler("delete")}><i class="fas fa-trash mr-2"></i> Delete placemark</button>
        </footer>
    </div>
</div>

{#if context === 'browse'}
    <div id="add-{placemark._id}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{#if categories.length}Add to my placemarks{:else}No categories found!{/if}</p>
                <button class="delete" aria-label="close"></button>
            </header>
            {#if categories.length > 0}
                <section class="modal-card-body">
                    <div class="field">
                        <label for="category" class="label">Select Category</label>
                        <div class="control has-icons-left">
                            <div class="select">
                                <select name="category" id="category" required style="min-width: 250px;" bind:value={importCategory}>
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
                    <button class="button is-success" on:click={() => placemarkHandler("add")}><i class="fas fa-floppy-disk mr-2"></i> Save</button>
                </footer>
            {:else}
                <section class="modal-card-body">
                    <p class="subtitle is-6">Please create a category first.</p>
                </section>
            {/if}
        </div>
    </div>
{/if}

<div id="image-{placemark._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <p class="image">
            <img src="{placemarkimg}">
        </p>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
</div>

<div id="upload-{placemark._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Upload image</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <ImageUpload context="placemarks" img={placemark.img} id={placemark._id} />
        </section>
    </div>
</div>

<style>
    .placemark-badge {
        width: 125px;
        text-align: center;
    }
</style>