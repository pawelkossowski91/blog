<template>

    <div class="card">
        <div class="card-header">
            <div class="card-title h5">{{ post.title }}</div>
            <div class="card-subtitle text-gray">{{ post.date }}</div>
        </div>
        <div class="card-body" v-html="post.content"></div>
        <div class="card-footer">
            <button class="btn btn-primary" @click="$router.push({name: 'home'})">
                <i class="icon icon-arrow-left"></i>
                Powrót do listy
            </button>
        </div>
    </div>

</template>

<script>

    export default {
        name: "PostDetails",
        props: ["slug"],
        data() {
            return {
                post: {}
            };
        },
        created() {
            this.$http.get(`/post/${this.slug}`).then(({ data }) => {
                this.post = data
            }).catch(() => {
                this.error = true
                console.log('details: get(), 404')
                this.$router.push({ name: "404" })
            })
        }
    };

</script>