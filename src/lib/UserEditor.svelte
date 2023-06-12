<script lang="ts">
    import {placemarkService} from "../services/placemark-service";
    import {modalHelper} from "../helper/modal.js";
    import {onMount} from "svelte";
    import type {User} from "../services/placemark-types";

    export let editUser: User = {} as User;

    async function adminHandler() {
        if (editUser.isAdmin) {
            await placemarkService.removeAdmin(editUser._id);
        } else {
            await placemarkService.makeAdmin(editUser._id);
        }
        window.location.reload();
    }

    async function deleteUser() {
        await placemarkService.deleteUser(editUser._id);
        window.location.reload();
    }

    onMount(() => {
        modalHelper.init();
    })
</script>

<style>
    .user-block {
        padding: 1rem;
    }
</style>

<article class="panel is-link">
    <p class="panel-heading">
        <i class="fas fa-pen-to-square mr-2"></i> User Editor
    </p>
    <p class="user-block">
        <strong>First name:</strong> {editUser.firstName}<br>
        <strong>Last name:</strong> {editUser.lastName}<br>
        <strong>E-Mail:</strong> {editUser.email}<br>
        <strong>Admin:</strong> {#if editUser.isAdmin}yes{:else}no{/if}<br><br>
        <a class="button is-link js-modal-trigger" data-target="admin-{editUser._id}"><i class="fas fa-gear mr-2"></i> {#if editUser.isAdmin}Remove{:else}Make{/if} Admin</a>
        <a class="button is-danger js-modal-trigger" data-target="delete-{editUser._id}"><i class="fas fa-trash mr-2"></i> Delete User</a>
    </p>
</article>

<div id="admin-{editUser._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Are you sure?</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            Admin status will be {#if editUser.isAdmin}removed{:else}granted{/if} for user <strong>{editUser.firstName} {editUser.lastName}</strong>.
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click={adminHandler}><i class="fas fa-check mr-2"></i> Confirm</button>
        </footer>
    </div>
</div>

<div id="delete-{editUser._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Are you sure?</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            User <strong>{editUser.firstName} {editUser.lastName}</strong> will be deleted.
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click={deleteUser}><i class="fas fa-check mr-2"></i> Confirm</button>
        </footer>
    </div>
</div>