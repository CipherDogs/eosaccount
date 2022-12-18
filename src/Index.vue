<template>
    <div id="app">
        <div id="main_container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index'
    }
</script>

<style>
    body {
        margin: 0;
        background: #F0F0F0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, Fira, Sans, "Droid Sans", "Helvetica Neue", sans-serif;
    }
</style>
