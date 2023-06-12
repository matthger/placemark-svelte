<script lang="ts">
    import {loading, user} from "../../stores";
    import NavBar from "$lib/NavBar.svelte";
    import {placemarkService} from "../../services/placemark-service";
    import {onMount} from "svelte";
    import {modalHelper} from "../../helper/modal.js";
    import {goto} from "$app/navigation";
    import type {LoggedInUser} from "../../services/placemark-types";

    let categoryCount = 0;
    let placemarkCount = 0;

    onMount(async () => {
        $loading = true;
        let categories = await placemarkService.getUserCategories($user._id);
        categoryCount = categories.length;
        let placemarks = await placemarkService.getPlacemarksByUserId($user._id);
        placemarkCount = placemarks.length;
        $loading = false;
        modalHelper.init();
    });

    async function deleteUser() {
        $loading = true;
        await placemarkService.deleteUser($user._id);
        $user = {} as LoggedInUser;
        $loading = false;
        goto("/");
    }
</script>

<svelte:head>
    <title>Placemark - My profile</title>
</svelte:head>

<NavBar loggedIn=true active="user" />

<div class="container">
    <div class="columns is-align-items-center">
        <div class="column has-text-centered-touch has-text-right">
            <img width="400" src="/placemarklogo2.png" alt="Logo"/>
        </div>
        <div class="column has-text-centered-mobile">
            <h1 class="title">Welcome {$user.firstName} {$user.lastName}!</h1>
            <p>
                You logged in with email: <strong>{$user.email}</strong>.
            </p>
            <p class="mb-4">
                Until now, you have created <strong>{placemarkCount}</strong> placemark{#if placemarkCount !== 1}s{/if} in <strong>{categoryCount}</strong> categor{#if categoryCount !== 1}ies{:else}y{/if}.{#if placemarkCount > 5 } Keep up the good work!{/if}
            </p>
            <a href="/password" class="button is-info"><i class="fas fa-key mr-2"></i> Change password</a>
            <a class="button is-danger js-modal-trigger" data-target="delete-{$user._id}"><i class="fas fa-trash mr-2"></i> Delete account</a>
        </div>
    </div>
</div>

<div id="delete-{$user._id}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Are you sure?</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            Your account will be deleted.
        </section>
        <footer class="modal-card-foot">
            <a class="button is-success" on:click={deleteUser}><i class="fas fa-check mr-2"></i> Confirm</a>
        </footer>
    </div>
</div>