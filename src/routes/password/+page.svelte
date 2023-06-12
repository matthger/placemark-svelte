<script lang="ts">
    import NavBar from "$lib/NavBar.svelte";
    import PasswordForm from "$lib/PasswordForm.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(() => {
        if (!localStorage.getItem("user")) goto("/login");
    })
</script>

<svelte:head>
    <title>Placemark - Change password</title>
</svelte:head>

<NavBar loggedIn=true active="user" />

<div class="container">
    <div class="box login-box">
        <h1 class="title">Change password</h1>
        <PasswordForm />
    </div>
</div>