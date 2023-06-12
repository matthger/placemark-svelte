<script lang="ts">
    import SignupForm from "$lib/SignupForm.svelte";
    import NavBar from "$lib/NavBar.svelte";
</script>

<svelte:head>
    <title>Signup for Placemark</title>
</svelte:head>

<NavBar />

<div class="container">
    <div class="box login-box">
        <h1 class="title">Sign up</h1>
        <SignupForm />
    </div>
</div>

