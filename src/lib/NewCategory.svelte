<script lang="ts">
    import {placemarkService} from "../services/placemark-service";
    import {user} from "../stores";
    import type {Category} from "../services/placemark-types";

    let description = '';
    let name = '';

    async function addCategory() {
        let category: Category  = {
            name: name,
            description: description,
            user: $user._id,
            img: ''
        } as Category;
        await placemarkService.createCategory(category);
        window.location.reload();
    }
</script>

<form on:submit|preventDefault={addCategory} class="box">
    <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control has-icons-left">
            <input bind:value={name} class="input" id="name" type="text" placeholder="Enter the name for the new category" name="name" required>
            <span class="icon is-small is-left">
              <i class="fas fa-star"></i>
            </span>
        </div>
    </div>

    <div class="field">
        <label for="description" class="label">Description</label>
        <div class="control has-icons-left">
            <input bind:value={description} class="input" id="description" type="text" placeholder="Enter a description for the new category" name="description" required>
            <span class="icon is-small is-left">
              <i class="fas fa-file"></i>
            </span>
        </div>
    </div>

    <button class="button is-success"><i class="fas fa-floppy-disk mr-2"></i> Save</button>
</form>