<script lang="ts">
    import UserPanel from "$lib/UserPanel.svelte";
    import Notification from "$lib/Notification.svelte";
    import UserEditor from "$lib/UserEditor.svelte";
    import type {User} from "../services/placemark-types";

    export let users: User[] = [];
    let editUser: User | null = null;
    export let searchValue = "";
</script>

{#if !users.length}
    <Notification type="warning" message="No other user found." icon="circle-exclamation" />
{/if}

<div class="columns mb-6">
    <div class="column">
        {#if users.length}
            <UserPanel {users} bind:editUser={editUser} bind:searchValue={searchValue}/>
        {/if}
    </div>
    <div class="column">
        {#if editUser}
            <UserEditor {editUser} />
        {/if}
    </div>
</div>