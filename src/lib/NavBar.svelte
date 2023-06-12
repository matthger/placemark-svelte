<script lang="ts">
    import {onMount} from "svelte";
    import {burgermenuHelper} from "../helper/burger-menu.js";
    import {user} from "../stores";

    export let admin = false;
    export let active = '';
    export let loggedIn = false;
    export let loggedInAdmin = '';

    onMount(() => {
       burgermenuHelper.init();
    });
</script>

<style>
    .active-page {
        background-color: #fafafa;
        color: #485fc7;
    }
</style>

<nav class="navbar has-background-light mb-5">
    <div class="container">
        <div class="navbar-brand">
            {#if loggedIn }
            <div class="navbar-item">
                <img src="/placemarklogo.png" alt="Logo">
            </div>
            {:else}
            <a class="navbar-item" href="/">
                <img src="/placemarklogo.png" alt="Logo">
            </a>
            {/if}

            {#if admin !== true}
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="burgerMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            {/if}
        </div>

        <div class="navbar-menu burger-menu is-hidden-desktop" id="burgerMenu">
            {#if loggedIn}
            <a class="navbar-item {active === 'user' ? 'active-page' : ''}" href="/user">
                <i class="fas fa-user mr-2"></i> Profile
            </a>
            <a class="navbar-item {active === 'categories' ? 'active-page' : ''}" href="/categories">
                <i class="fas fa-star mr-2"></i> Categories
            </a>
            <a class="navbar-item {active === 'placemarks' ? 'active-page' : ''}" href="/placemarks">
                <i class="fas fa-map-pin mr-2"></i> My Placemarks
            </a>
            <a class="navbar-item {active === 'browse' ? 'active-page' : ''}" href="/browse">
                <i class="fas fa-globe mr-2"></i> Browse
            </a>
            <a class="navbar-item {active === 'map' ? 'active-page' : ''}" href="/map">
                <i class="fas fa-map-location-dot mr-2"></i> Map
            </a>
            <a class="navbar-item {active === 'charts' ? 'active-page' : ''}" href="/charts">
                <i class="fas fa-chart-line mr-2"></i> Charts
            </a>
            <a class="navbar-item {active === 'about' ? 'active-page' : ''}" href="/about">
                <i class="fas fa-address-card mr-2"></i> About
            </a>
            <a class="navbar-item" href="/logout">
                <i class="fas fa-house-user mr-2"></i> Logout
            </a>
            {:else}
            <a class="navbar-item" href="/signup">
                <i class="fas fa-user-plus mr-2"></i> Sign up
            </a>
            <a class="navbar-item" href="/login">
                <i class="fas fa-user mr-2"></i> Login
            </a>
            {/if}
        </div>

        <div id="navbar" class="navbar-menu">
            {#if loggedIn}
            <div class="navbar-start">
                {#if admin}
                <a class="navbar-item {active === 'admin' ? 'active-page' : ''}" href="/admin/dashboard">
                    <i class="fas fa-gauge mr-2"></i> Dashboard
                </a>
                {:else}
                <a class="navbar-item {active === 'user' ? 'active-page' : ''}" href="/user">
                    <i class="fas fa-user mr-2"></i> Profile
                </a>
                <a class="navbar-item {active === 'categories' ? 'active-page' : ''}" href="/categories">
                    <i class="fas fa-star mr-2"></i> Categories
                </a>
                <a class="navbar-item {active === 'placemarks' ? 'active-page' : ''}" href="/placemarks">
                    <i class="fas fa-map-pin mr-2"></i> My Placemarks
                </a>
                <a class="navbar-item {active === 'browse' ? 'active-page' : ''}" href="/browse">
                    <i class="fas fa-globe mr-2"></i> Browse
                </a>
                <a class="navbar-item {active === 'map' ? 'active-page' : ''}" href="/map">
                    <i class="fas fa-map-location-dot mr-2"></i> Map
                </a>
                <a class="navbar-item {active === 'charts' ? 'active-page' : ''}" href="/charts">
                    <i class="fas fa-chart-line mr-2"></i> Charts
                </a>
                <a class="navbar-item {active === 'about' ? 'active-page' : ''}" href="/about">
                    <i class="fas fa-address-card mr-2"></i> About
                </a>
                {/if}
            </div>
            {/if}

            <div class="navbar-end">
                {#if !admin}
                {#if !loggedIn}
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-link is-info" href="/signup">
                            <i class="fas fa-user-plus mr-2"></i>
                            Sign up
                        </a>
                        <a class="button is-light" href="/login">
                            <i class="fas fa-user mr-2"></i> Login
                        </a>
                    </div>
                </div>
                {/if}
                {/if}
                {#if loggedIn}
                    {#if admin}
                        <div class="navbar-item">
                            <i class="fas fa-user-gear mr-2"></i> {loggedInAdmin}
                        </div>
                    {/if}
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-link is-info" href="/logout">
                            <i class="fas fa-house-user mr-2"></i> Logout
                        </a>
                    </div>
                </div>
                {/if}
            </div>
        </div>
    </div>
</nav>