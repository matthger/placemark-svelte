<script lang="ts">
    import {goto} from "$app/navigation";
    import {placemarkService} from "../services/placemark-service";
    import Notification from "$lib/Notification.svelte";
    import {loading} from "../stores";

    export let admin = false;

    let email = "";
    let password = "";
    let success = null;

    async function formHandler() {
        $loading = true;
        success = await placemarkService.login(admin, email, password);
        $loading = false;
        if (success) {
            (admin) ? goto("/admin/dashboard") : goto("/user");
        }
    }
</script>

{#if !success && success !== null}
    <Notification message="Invalid username or password!" type="danger" icon="exclamation-triangle" />
{/if}

<form on:submit|preventDefault={formHandler}>
    <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control has-icons-left">
            <input bind:value={email} class="input" id="email" type="text" placeholder="Enter email" name="email" required>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
        </div>
    </div>
    <div class="field">
        <label class="label" for="password">Password</label>
        <div class="control has-icons-left">
            <input bind:value={password} class="input" id="password" type="password" placeholder="Enter Password" name="password">
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
        </div>
    </div>
    <div class="field is-grouped">
        <button class="button is-link mr-2"><i class="fas fa-user mr-2"></i> Log in</button>
        {#if admin}
        <a class="button is-link is-info" href="/">
            <i class="fas fa-backward mr-2"></i> Back to app
        </a>
        {/if}
    </div>
</form>
