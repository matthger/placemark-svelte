<script lang="ts">
    import {loading} from "../stores";
</script>

<style>
    .loader-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.45);
        z-index: 1500;
    }
    .loader {
        display: block;
        position: relative;
        left: 50%;
        top: 45%;
        font-size: 60px;
    }
</style>

{#if $loading}
    <div class="loader-wrapper">
        <div class="loader is-loading"></div>
    </div>
{/if}