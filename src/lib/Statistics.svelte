<script lang="ts">
    export let id = "";
    export let count = 0;
    export let title = "";
    export let icon = "";
</script>

<div class="box scale-on-hover">
    <h1 class="title has-text-centered stats-count" id="{id}">{count}</h1>
    <div class="stats-title has-text-centered"><i class="fas fa-{icon} mr-2"></i>{title}</div>
</div>

<style>
    .stats-count {
        font-size: 4rem;
    }
    .stats-title {
        font-size: 1.5rem;
    }
</style>