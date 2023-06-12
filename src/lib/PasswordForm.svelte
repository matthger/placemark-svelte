<script lang="ts">
    import {placemarkService} from "../services/placemark-service";
    import Notification from "$lib/Notification.svelte";
    import {user} from "../stores";
    let success = null;
    let currentPassword = "";
    let newPassword = "";
    let response: any = "";

    async function changePassword() {
        response = await placemarkService.changePassword($user._id, currentPassword, newPassword);
        success = !!response._id;
    }
</script>

{#if success}
    <Notification message="Password changed." type="success" icon="check" />
{:else}
    {#if success !== null}
        <Notification message={response} type="danger" icon="exclamation-triangle" />
    {/if}
{/if}

<form on:submit|preventDefault={changePassword}>
    <div class="field">
        <label class="label" for="currentPassword">Current password</label>
        <div class="control has-icons-left">
            <input class="input" bind:value={currentPassword} id="currentPassword" type="password" placeholder="Enter current password" name="currentPassword" required>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
        </div>
    </div>
    <div class="field">
        <label class="label" for="newPassword">Password</label>
        <div class="control has-icons-left">
            <input class="input" bind:value={newPassword} id="newPassword" type="password" placeholder="Enter new password" name="newPassword" required>
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
        </div>
    </div>
    <div class="field is-grouped is-flex is-justify-content-space-between">
        <button class="button is-link mr-2"><i class="fas fa-check mr-2"></i> Change password</button>
        <a class="button is-link is-info" href="/user">
            <i class="fas fa-backward mr-2"></i> Go back
        </a>
    </div>
</form>