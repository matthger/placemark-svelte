<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import LoginForm from "$lib/LoginForm.svelte";
</script>

<NavBar loggedIn={false} />

<svelte:head>
    <title>Login to Placemark</title>
</svelte:head>

<div class="container">
    <div class="box login-box">
        <h1 class="title">Log in</h1>
        <LoginForm />
    </div>
</div>