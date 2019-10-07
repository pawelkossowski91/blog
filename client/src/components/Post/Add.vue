<template>
    <div class="card" v-if="!error">
        <div class="card-header">
            <div class="card-title h5">Dodaj nowy wpis</div>
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
                <button class="btn btn-error" @click="$router.go(-1)">Anuluj</button>
                <button class="btn btn-success float-right" :disabled="!filled" @click="save">Zapisz</button>
            </div>
        </div>
    </div>
    <div class="toast toast-error" v-else>
        Wystąpił błąd.
    </div>
</template>

<script>

    export default {
        name: "PostAdd",
        data() {
            return {
                post: {
                    title: "",
                    date: "",
                    content: ""
                },
                error: false
            }
        },
        computed: {
            filled() {
                const { title, date, content } = this.post;

                return title && date && content;
            }
        },
        methods: {
            save() {
                this.$http.post("/posts", {
                    title: this.post.title,
                    date: this.post.date,
                    content: this.post.content,
                }).then(({ data }) => {
                setTimeout(() => {
                    this.$router.push({ name: "post", params: { slug: data.slug } })
                }, 2000)
            }).catch(() => {
                this.error = true
                console.log('details: post(), 404')
            })

            }
        }
    };

</script>