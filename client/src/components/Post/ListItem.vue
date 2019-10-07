<template>
    <div class="col bottom">
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <h5 class="card-title"><small>data dodatnia: </small>{{ post.date }}</h5>
            <p class="card-text">
                <router-link :to="{ name: 'post', params: { slug: post.slug} }">Czytaj wiecej</router-link>
            </p>
            <router-link :to="{ name: 'postEdit', params: { slug: post.slug }}">
                <button class="btn btn-primary">
                    <p>edytuj</p>
                </button>
            </router-link>
            <button class="btn btn-error" @click="remove">
                <p>usuń</p>
            </button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "PostListItem",
        props: ["post"],
        methods: {
            remove() {
                this.$emit("remove", this.post.id)
            }
        }
    };

</script>

<style scoped>

    .bottom {
        margin-bottom: 20px;
        opacity: 0.9;
        filter: alpha(opacity=90);
    }
    .bottom:hover {
        margin-bottom: 20px;
        opacity: 1;
        filter: alpha(opacity=100);
    }

</style>