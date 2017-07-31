<template>
    <div>
    <div v-if="passwordReset">
    <div class="form-group">
            <div class="col-xs-12">
                <input type="password"
                       class="form-control"
                       :placeholder="passwordPlaceholder"
                       v-model="data.password"
                       @keyup.enter="resetPassword">
            </div>
    </div>
    <div class="form-group">
        <div class="col-xs-12">
            <input type="password"
                   class="form-control"
                   :placeholder="passwordConfirmationPlaceholder"
                   v-model="data.password_confirmation"
                   @keyup.enter="resetPassword">
        </div>
    </div>
        <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
                <button @click="resetPassword" :disabled="loading" class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light">
                    <span v-if="!loading">{{resetButton}}</span>
                    <i class="fa fa-circle-o-notch fa-spin fa-fw" v-else></i>
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>{{forbiddenText}}</p>
    </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        props: {
            passwordPlaceholder: {
                type: String,
                required: true
            },
            passwordConfirmationPlaceholder: {
                type: String,
                required: true
            },
            resetButton: {
                type: String,
                required: true
            },
            forbiddenText: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                data: {
                    password: '',
                    password_confirmation: '',
                    token: ''
                },
                passwordReset: false,
                loading: false
            }
        },
        mounted () {
            this.checkForToken()
        },
        watch: {
            data: {
                handler: function() {
                    this.clearErrors()
                },
                deep: true
            }
        },
        methods: {
            clearErrors () {
                this.$emit('error', [])
            },
            checkForToken () {
                if (this.$route.query.token) {
                    this.data.token = this.$route.query.token
                    this.validateToken()
                }
            },
            validateToken () {
                axios.get(this.$coreAuthOptions('baseURL') + '/auth/reset_password/validate/' + this.data.token).then((response) => {
                    this.passwordReset = true
                })
            },
            resetPassword () {
                this.loading = true
                this.$auth.login({
                    url: this.$coreAuthOptions('baseURL') + '/auth/reset_password/reset',
                    data: this.data,
                    success: () => {
                        this.loading = false;
                    },
                    error: (error) => {
                        this.loading = false
                        if (error.response.status === 422) {
                            this.$emit('error', error.response.data)
                        }
                        if (error.response.status === 404) {
                            let formatted = {message: [error.response.data.message]}
                            this.$emit('error', formatted)
                        }
                    },
                    rememberMe: true,
                    fetchUser: true
                })
            },
        }
    }
</script>
