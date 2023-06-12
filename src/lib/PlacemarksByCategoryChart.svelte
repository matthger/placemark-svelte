<script lang="ts">
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service";
    import {user} from "../stores";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import type {Category} from "../services/placemark-types";
    import Notification from "$lib/Notification.svelte";
    import {loading} from "../stores.js";

    let data = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };

    let categories: Category[] = [];

    onMount(async () => {
        categories = await placemarkService.getUserCategories($user._id);
        data.labels = [];
        data.datasets[0].values = [];
        for (let category of categories) {
            data.labels.push(category.name);
            data.datasets[0].values.push(category.placemarks.length);
        }
    });
</script>

{#if !$loading}
    {#if categories.length >= 1}
        <Chart {data} type="pie" />
    {:else}
        <div style="height:300px;width: 100%;" class="is-flex is-align-items-center">
            <Notification type="warning" message="Not enough data to display chart." icon="circle-exclamation"/>
        </div>
    {/if}
    <h1 class="has-text-centered">My placemarks by category</h1>
{/if}