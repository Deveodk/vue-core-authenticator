<template>
    <div>
        <div class="form-group">
                <div class="col-xs-12 core-password-form">
                    <input type="password"
                           class="form-control"
                           :placeholder="passwordPlaceholder"
                           v-model="data.password"
                           @keyup.enter="login"
                           ref="password">
                </div>
            </div>

        <div class="form-group">
            <div class="col-md-12">
                <div class="checkbox checkbox-primary pull-left p-t-0">
                    <input id="checkbox-signup" v-model="data.remember" type="checkbox">
                    <label for="checkbox-signup"> {{ rememberMeLabel }} </label>
                </div>
                <router-link :to="{name: forgotPasswordRouteName}" id="to-recover" class="text-dark pull-right">
                    <i class="fa fa-lock m-r-5"></i> {{ forgotPasswordLabel }}
                </router-link>
            </div>
        </div>
        <div class="form-group text-center m-t-20">
            <div class="col-sm-12 text-center">
                <span @click="$emit('back')">
                    <i class="fa fa-chevron-left fa-fw"></i>
                </span>
            </div>
        </div>
        <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
                <button @click="login" :disabled="loading" class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light">
                    <span v-if="!loading">{{loginButton}}</span>
                    <i class="fa fa-circle-o-notch fa-spin fa-fw" v-else></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import eventHub from '../../eventHub.js'
    export default {
        name: 'corePasswordForm',
        props: {
            passwordPlaceholder: {
                type: String,
                required: true
            },
            rememberMeLabel: {
                type: String,
                required: true
            },
            forgotPasswordLabel: {
                type: String,
                required: true
            },
            forgotPasswordRouteName: {
                type: String,
                required: true
            },
            loginButton: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                data: {
                    email: '',
                    password: '',
                    model: '',
                    remember: true
                },
                loading: false
            }
        },
        mounted () {
            eventHub.$emit('accountFlowOn')
            this.$refs.password.focus()
        },
        beforeDestroy () {
            eventHub.$emit('accountFlowOff')
        },
        watch: {
            data: {
                handler: function () {
                    this.clearErrors()
                },
                deep: true
            }
        },
        methods: {
            clearErrors () {
                this.$emit('error', [])
            },
            login () {
                this.loading = true
                this.$auth.login({
                    data: this.data,
                    success: () => {
                        this.loading = false
                    },
                    error: (error) => {
                        this.loading = false
                        if (error.response.status === 422) {
                            this.$emit('error', error.response.data)
                        }
                        if (error.response.status === 401) {
                            const formatted = { message: [error.response.data.message] }
                            this.$emit('error', formatted)
                        }
                        if (error.response.status === 429) {
                            const formatted = { message: [error.response.data.message] }
                            this.$emit('error', formatted)
                        }
                    },
                    rememberMe: this.data.remember,
                    fetchUser: true
                })
            }
        }
    }
</script>
