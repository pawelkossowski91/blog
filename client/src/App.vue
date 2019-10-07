<template>

    <div id="app">

        <div class="container grid-lg">

            <header class="navbar">

                <section class="navbar-section">
                    <h1>
                        <a href="/">Vue.js blog</a>
                    </h1>
                    
                </section>

                <section class="navbar-section">
                    <router-link :to="{ name: 'postAdd'}" class="mr-2">
                        <button type="button" class="btn btn-primary btn-lg">Dodaj nowy wpis</button>
                    </router-link>
                </section>

            </header>

        </div>

        <div class="container grid-lg">
            <router-view></router-view>
        </div>

     
        <footer>
                <p>&copy;{{ (new Date()).getFullYear() }}</p>
        </footer>
    </div>

</template>

<script>

    export default {
        name: "App"
    };

</script>

<style>
    @import "spectre.css";

    body {
        background: linear-gradient(to bottom, rgb(128, 105, 105), rgb(19, 113, 129));
        box-sizing: border-box;
    }

    .container {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    h1 {
          font-style: oblique;
    }

    footer {
        text-align: center;
        color: antiquewhite;
    }

</style>