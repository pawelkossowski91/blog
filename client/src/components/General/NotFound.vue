<template functional>

    <div class="card">
        <div class="card-header text-center text-error">
            <div class="card-title h1"><i class="icon icon-2x icon-stop"></i> 404</div>
            <div class="card-title h3">Strona nie istnieje.</div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "NotFound"
    };

</script>

<style lang="scss" scoped>

    .card-title .icon {
        vertical-align: baseline;
    }

</style>