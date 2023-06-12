<script lang="ts">
    import type {User} from "../services/placemark-types";

    export let user: User = {} as User;
    export let editUser : User | null = null;

    const selectUser = () => {
        editUser = user;
    }
</script>

<style>
    .panel-user.is-active {
        background-color: #f5f5f5;
    }
</style>

<a class="panel-block panel-user {user._id} is-flex is-justify-content-space-between {(editUser) && (editUser._id === user._id) ? 'is-active' : ''}" on:click={selectUser} data-id="{user._id}">
    <div class="is-flex is-align-items-center">
        <span class="panel-icon">
                          <i class="fas fa-user" aria-hidden="true"></i>
                        </span>
        <span class="user-infos">{user.lastName}, {user.firstName} ({user.email})</span>
    </div>
    {#if user.isAdmin}
        <span class="tag is-light is-link">ADMIN</span>
    {/if}
</a>