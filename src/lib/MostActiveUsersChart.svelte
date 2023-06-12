<script lang="ts">
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import {loading} from "../stores";
    import type {User} from "../services/placemark-types";
    import Notification from "$lib/Notification.svelte";

    let data = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };

    let users: User[] = [];

    onMount(async () => {
        $loading = true;
        users = await placemarkService.getUsers();
        let names = [];
        let placemarks = [];
        for (let user of users) {
            user.placemarks = await placemarkService.getPlacemarksByUserId(user._id);
        }
        users.sort((a, b) => b.placemarks.length - a.placemarks.length);
        for (let i = 0; i < 3; i++) {
            names.push(`${users[i].firstName} ${users[i].lastName}`);
            placemarks.push(users[i].placemarks.length);
        }
        data.labels = names;
        data.datasets[0].values = placemarks;
        console.log(data);
        $loading = false;
    });
</script>

{#if !$loading}
    {#if users.length >= 3}
        <Chart {data} type="bar" />
        {:else}
        <div style="height:300px;width: 100%;" class="is-flex is-align-items-center">
            <Notification type="warning" message="Not enough data to display chart." icon="circle-exclamation" />
        </div>
    {/if}
    <h1 class="has-text-centered">Top 3 most active users (placemarks created)</h1>
{/if}