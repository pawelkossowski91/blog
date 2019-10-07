<template>

    <div class="container">
        <div v-if="!error">
            <ListItem v-for="post in posts" :post="post" :key="post.id" @remove="removed"/>
        </div>
        <div class="toast toast-error" v-else>
            Wystąpił problem.
        </div>
    </div>

</template>

<script>
import ListItem from "./ListItem"

    export default {
        name: "PostList",
        data() {
            return {
                posts: [],
                error: false
            };
        },
        components: {
            ListItem

        },
        methods: {
            removed(id) {
                this.$http.delete(`/post/${id}`).then(({data})=>{
                    this.posts = this.posts.filter(post => post.id != id)
                }).catch(()=>{
                    this.error = true
                })
            }
        },
        created() {
            this.$http.get("/posts").then(({ data }) => {
                this.posts = data
            }).catch(() => {
                this.error = true
            })
        }
    };

</script>