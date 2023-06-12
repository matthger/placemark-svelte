<script lang="ts">
    export let searchValue = '';
</script>

<div class="control has-icons-left mr-2">
    <input class="input search-placemark" type="text" placeholder="Search" bind:value={searchValue}>
    <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
    </span>
</div>