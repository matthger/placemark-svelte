<script lang="ts">
    import {onMount} from "svelte";
    import {modalHelper} from "../helper/modal.js";
    import ImageUpload from "$lib/ImageUpload.svelte";
    import {loading, user} from "../stores";
    import {placemarkService} from "../services/placemark-service";
    import type {Category} from "../services/placemark-types";

    export let category: Category = {} as Category;
    let img;
    $: img = category.img ? category.img : '/imageplaceholder.png';

    let newName = category.name;
    let newDescription = category.description;

    onMount(async () => {
        modalHelper.init();
    });

    async function categoryHandler(type) {
        let updatedCategory;
        $loading = true;
        switch (type) {
            case 'delete':
                await placemarkService.deleteCategory(category._id);
                break;
            case 'edit':
                updatedCategory  = {
                    name: newName,
                    description: newDescription,
                    user: $user._id,
                    img: ''
                }
                await placemarkService.editCategory(category._id, updatedCategory);
                break;
        }
        $loading = false;
        window.location.reload();
    }
</script>

<div class="box">
    <article class="media is-align-items-center">
        <div class="media-left">
            <figure class="image is-96x96 is-flex align-items-center js-modal-trigger" data-target="upload-{category._id}">
                <img class="is-rounded" src="{img}" alt="Category" style="object-fit: contain;">
            </figure>
        </div>

        <div class="media-content">
            <div class="content">
                <p>
                    <a href="/placemarks?filter={category._id}" class="is-link"><strong class="is-size-4">{category.name}</strong></a>
                    <br>
                    <small><strong>Description: </strong> {category.description}</small>
                    <br>
                    <small><strong>Placemarks: </strong> {category.placemarks.length}</small>
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="js-modal-trigger level-item" aria-label="edit" data-target="edit-{category._id}">
                        <span class="icon is-small">
                          <i class="fas fa-pen" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a class="js-modal-trigger level-item" aria-label="delete" data-target="delete-{category._id}">
                        <span class="icon is-small">
                          <i class="fas fa-trash" aria-hidden="true"></i>
                        </span>
                    </a>
                </div>
            </nav>
        </div>
    </article>
</div>

<div id="edit-{category._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit category: <strong>{category.name}</strong></p>
            <button class="delete" aria-label="close"></button>
        </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="name" class="label">Name</label>
                    <div class="control has-icons-left">
                        <input bind:value={newName} class="input" id="name" type="text" placeholder="Enter a new name for the category" name="name" required>
                        <span class="icon is-small is-left">
                          <i class="fas fa-star"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="description" class="label">Description</label>
                    <div class="control has-icons-left">
                        <input bind:value={newDescription} class="input" id="description" type="text" placeholder="Enter a new desimage-store.jscription for the category" name="description" required>
                        <span class="icon is-small is-left">
                          <i class="fas fa-file"></i>
                        </span>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" on:click={() => categoryHandler("edit")}><i class="fas fa-pen mr-2"></i> Save changes</button>
            </footer>
    </div>
</div>

<div id="delete-{category._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Are you sure?</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            The category <strong>{category.name}</strong> and all its placemarks will be deleted.
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" on:click={() => categoryHandler("delete")}><i class="fas fa-trash mr-2"></i> Delete category</button>
        </footer>
    </div>
</div>

<div id="upload-{category._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Upload image</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <ImageUpload context="categories" img={category.img} id={category._id} />
        </section>
    </div>
</div>
