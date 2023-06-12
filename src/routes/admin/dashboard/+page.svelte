<script lang="ts">
    import Statistics from "$lib/Statistics.svelte";
    import NavBar from "$lib/NavBar.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemark-service";
    import {loading, user} from "../../../stores";
    import UserManager from "$lib/UserManager.svelte";
    import type {Category, Placemark, User} from "../../../services/placemark-types";

    let placemarks: Placemark[] = [], categories: Category[] = [], users: User[] = [], searchValue = "";
    $: filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(searchValue.toLowerCase()) || user.lastName.toLowerCase().includes(searchValue.toLowerCase()) || user.email.toLowerCase().includes(searchValue.toLowerCase()));

    let loggedInAdmin = "";

    onMount(async () => {
        $loading = true;
        users = await placemarkService.getUsers();
        users = users.filter(u => u._id.toString() !== $user._id);
        placemarks = await placemarkService.getPlacemarks();
        categories = await placemarkService.getCategories();
        loggedInAdmin = `${$user.firstName} ${$user.lastName}`
        $loading = false;
    })

</script>

<svelte:head>
    <title>Placemark - Admin Dashboard</title>
</svelte:head>

<NavBar admin={true} loggedIn={true} active="admin" {loggedInAdmin} />

<div class="container">
    <h1 class="title"><i class="fas fa-chart-line mr-2"></i> Statistics</h1>
    <div class="columns mb-6">
        <div class="column">
            <Statistics count={users.length} title="User Count" icon="user" id="userCount"/>
        </div>
        <div class="column">
            <Statistics count={placemarks.length} title="Placemark Count" icon="map-pin" id="placemarkCount"/>
        </div>
        <div class="column">
            <Statistics count={categories.length} title="Category Count" icon="star" id="categoryCount"/>
        </div>
    </div>

    <h1 class="title" id="userManager"><i class="fas fa-users mr-2"></i> User Manager</h1>
    <UserManager users={filteredUsers} bind:searchValue={searchValue}/>
</div>