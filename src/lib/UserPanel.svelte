<script lang="ts">
    import Notification from "$lib/Notification.svelte";
    import PanelUser from "$lib/PanelUser.svelte";
    import type {User} from "../services/placemark-types";

    export let users: User[] = [];
    export let editUser: User | null = null;
    export let searchValue = "";
</script>

<style>
    .user-panel {
        height: 500px;
        overflow-y: scroll;
    }
</style>

<article class="user-panel panel is-link">
    <p class="panel-heading">
        <i class="fas fa-list mr-2"></i> User List
    </p>
    <div class="panel-block is-sticky has-background-white" style="top: 0px;">
        <p class="control has-icons-left">
            <input class="input is-link search-user" type="text" placeholder="Search" bind:value={searchValue} >
            <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
        </p>
    </div>
    <div class="no-search-results is-hidden m-3">
        <Notification message="No users found." type="warning" icon="circle-exclamation"/>
    </div>

    {#each users as user}
        <PanelUser {user} bind:editUser={editUser} />
    {/each}
</article>