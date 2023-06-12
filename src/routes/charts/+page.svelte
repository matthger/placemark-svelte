<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PlacemarksByCategoryChart from "$lib/PlacemarksByCategoryChart.svelte";
    import MostActiveUsersChart from "$lib/MostActiveUsersChart.svelte";
</script>

<svelte:head>
    <title>Placemark - Charts</title>
</svelte:head>

<NavBar loggedIn={true} active="charts" />

<div class="container">
    <h1 class="title"><i class="fas fa-chart-line mr-2"></i> Charts</h1>
    <div class="columns">
        <div class="column">
            <MostActiveUsersChart />
        </div>
        <div class="column">
            <PlacemarksByCategoryChart />
        </div>
    </div>
</div>