<script lang="ts">
    import { placemarkService } from "../services/placemark-service";
    import Notification from "$lib/Notification.svelte";
    import {loading} from "../stores";

    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let success = null;

    async function signup() {
        $loading = true;
        success = await placemarkService.signup(firstName, lastName, email, password);
        $loading = false
    }
</script>

{#if success}
    <Notification message="Account created successfully!" type="success" icon="check" />
{:else}
    {#if success !== null}
        <Notification message="Account already exists!" type="danger" icon="exclamation-triangle" />
    {/if}
{/if}

<form on:submit|preventDefault={signup}>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label for="firstname" class="label">First Name</label>
                <div class="control has-icons-left">
                    <input class="input" id="firstname" type="text" placeholder="Enter your first name" name="firstName" bind:value={firstName} required>
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label for="lastname" class="label">Last Name </label>
                <div class="control has-icons-left">
                    <input class="input" id="lastname" type="text" placeholder="Enter your last name" name="lastName" bind:value={lastName} required>
                    <span class="icon is-small is-left">
                      <i class="fas fa-signature"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="field">
        <label for="email" class="label">Email</label>
        <div class="control has-icons-left">
            <input class="input" id="email" type="email" placeholder="Enter your email" name="email" bind:value={email} required>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
        </div>
    </div>
    <div class="field">
        <label for="password" class="label">Password</label>
        <div class="control has-icons-left">
            <input class="input" id="password"type="password" placeholder="Enter a strong password" name="password" bind:value={password} required>
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
        </div>
    </div>
    <div class="field is-grouped">
        <button class="button is-link is-info"><i class="fas fa-user-plus mr-2"></i> Sign up</button>
    </div>
</form>
