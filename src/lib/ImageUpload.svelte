<script lang="ts">
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service";
    import FormData from "form-data";
    import {loading} from "../stores";

    export let context = "";

    let fileInput = [];
    let fileName = [];
    
    export let img = "";
    export let id = "";

    onMount(async () => {
        if (browser) {
            fileInput[id] = document.querySelector(".file-input-" + id);
            if (fileInput[id]) {
                fileInput[id].onchange = () => {
                    if (fileInput[id].files.length > 0) {
                        fileName[id] = document.querySelector(".file-name-" + id);
                        fileName[id].textContent = fileInput[id].files[0].name;
                    }
                };
            }
        }
    });

    async function uploadImage () {
        let form = new FormData();
        let imagefile = fileInput[id].files[0];
        form.append("imagefile", imagefile);
        $loading = true;
        await placemarkService.uploadImage(context, id, form);
        $loading = false;
        window.location.reload();
    }

    async function deleteImage() {
        $loading = true;
        await placemarkService.deleteImage(context, id);
        $loading = false;
        window.location.reload();
    }
</script>

<div class="card">
    <div class="card-image">
        {#if img}
            <figure class="image is-256x256">
                <button class="button is-danger has-tooltip-left" data-tooltip="Remove image" on:click={deleteImage} style="position:absolute;right:0;"><i class="fas fa-trash"></i></button>
                <img src={img} alt="Category">
            </figure>
        {/if}
    </div>
    <div class="card-content">
        <form on:submit|preventDefault={uploadImage}>
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label"> <input class="file-input file-input-{id}" name="imagefile" type="file" accept="image/png, image/jpeg" required>
                    <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                          Choose a file…
                        </span>
                   </span>
                    <span class="file-name file-name-{id}"></span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
            </div>
        </form>
    </div>
</div>