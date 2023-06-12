<script lang="ts">
    import {beforeUpdate} from "svelte";
    import { placemarkService } from "../services/placemark-service";
    import Spinner from "$lib/Spinner.svelte";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="container-fluid">
    <Spinner />
    <slot />
</div>
