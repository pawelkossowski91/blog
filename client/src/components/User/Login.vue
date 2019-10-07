<template>

    <div class="card">
        <div class="card-header">
            <div class="card-title h5">Logowanie</div>
        </div>
        <div class="card-body">

            <form action="#" class="form-horizontal" @submit.prevent>

                <div class="form-group">
                    <div class="col-2">
                        <label class="form-label">Login</label>
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-input" v-model="username">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-2">
                        <label class="form-label">Hasło</label>
                    </div>
                    <div class="col-3">
                        <input type="password" class="form-input" v-model="password">
                    </div>
                </div>

                <div class="col-5 has-error" v-if="error">
                    <p class="form-input-hint float-right">Podałeś niepoprawne dane.</p>
                </div>

            </form>

        </div>
        <div class="card-footer">
            <div class="col-5">
                <button class="btn btn-primary" @click="$router.go(-1)">
                    <i class="icon icon-arrow-left"></i>
                </button>
                <button class="btn btn-success float-right" :disabled="!filled">Wyślij</button>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "UserLogin",
        data() {
            return {
                username: "",
                password: "",
                error: false
            }
        },
        computed: {
            filled() {
                return this.username && this.password;
            }
        }
    };

</script>