<template>

    <div class="card" v-if="!error">
        <div class="card-header">
            <div class="card-title h5">Edytuj wpis</div>
        </div>
        <div class="card-body">

            <form action="#" class="form-horizontal">

                <div class="form-group">
                    <div class="col-2">
                        <label class="form-label">Tytuł</label>
                    </div>
                    <div class="col-5">
                        <input type="text" class="form-input" v-model="post.title">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-2">
                        <label class="form-label">Data</label>
                    </div>
                    <div class="col-2">
                        <input type="text" class="form-input" v-model="post.date">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-8">
                        <label class="form-label">Treść</label>
                        <textarea class="form-input" rows="7" v-model="post.content"></textarea>
                    </div>
                </div>

            </form>
        </div>
        <div class="card-footer">
            <div class="col-8">
                <button class="btn btn-error" @click="$router.push({ name: 'home' })">Anuluj</button>
                <button class="btn btn-success float-right" :disabled="!fielled" @click="save">Zapisz</button>
            </div>
        </div>
    </div>
    <div class="toast toast-error" v-else>
        Wystąpił problem.
    </div>

</template>

<script>

    export default {
        name: "PostEdit",
        props: ["slug"],
        data() {
            return {
                post: {},
                error: false
            };
        },
        computed: {
            fielled() {
                const { title,  date, content } = this.post

                if (title !=null && date!=null && content !=null) {
                    return title && date && content
                }
            }
        },
        methods: {
            save() {
                this.$http.put(`/post/${this.post.id}`, {
                    title: this.post.title,
                    date: this.post.date,
                    content: this.post.content
                }).then(({ data }) => {
                    this.$router.push({ name: "post", params: { slug: data.slug } })
            }).catch(() => {
                this.error = true
                console.log('details: put(), 404')
            })
            }

        },
        created() {

            this.$http.get(`/post/${this.slug}`)
                .then(({ data }) => {
                    this.post = data;
                })
                .catch(() => {
                    this.$router.push({ name: "404" });
                });

        }
    };

</script>