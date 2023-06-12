<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import LoginForm from "$lib/LoginForm.svelte";
</script>

<svelte:head>
    <title>Placemark - Admin Login</title>
</svelte:head>

<NavBar admin={true} loggedIn={false} active="admin" />

<div class="container">
    <div class="box login-box">
        <h1 class="title">Admin Login</h1>
        <LoginForm admin=true />
    </div>
</div>