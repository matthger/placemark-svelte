<script lang="ts">
    export let icon;
    export let type;
    export let message;
</script>

<div class="notification is-{type}" style="width: 100%;">
    {#if icon}
    <i class="fas fa-{icon} mr-2"></i>
    {/if}
    {message}
</div>