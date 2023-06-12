<script lang="ts">
    export let context;
</script>

<div class="container">
    <div class="columns is-vcentered content">
        <div class="column has-text-centered-touch has-text-right">
            <img width="400" src="/placemarklogo2.png" alt="Logo" />
        </div>
        <div class="column">
            <h1 class="title has-text-centered-touch">{#if context === "main"}Welcome to {:else}About{/if} PLACEMARK!</h1>
        </div>
    </div>
    <p class="has-text-centered mb-4">
        PLACEMARK is a project for the Advanced Full Stack Development Course at OTH Regensburg.
    </p>
    <p class="has-text-centered mb-4">
        PLACEMARK is a web application that allows you to save places you have visited or want to visit.
        You can add a place by entering the name, location, and a description of the place. You can also
        add a picture of the place. You can view all the places you have added and you can also view and add
        the places that other users have added. You can also edit and delete the places you have added.
    </p>
    <p class="has-text-centered mb-6">
        <strong>Developed by:</strong><br>
        Matthias Gerhard<br>
        Matr.Nr.: 3312948<br>
        <a href="mailto:matthias.gerhard@st.oth-regensburg.de"><i class="fas fa-envelope"></i> matthias.gerhard@st.oth-regensburg.de</a><br>
        {#if context === "main"}<a href="/admin"><i class="fas fa-gear"></i> Admin Login</a>{/if}
    </p>
</div>