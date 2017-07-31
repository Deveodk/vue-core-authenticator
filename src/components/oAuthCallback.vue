<template>
    <div>
        <core-account-chooser v-if="accounts.length"
                              @selected="login($event)"
                              :accounts="accounts"
                              :promptLabel="promptLabel"
                              @clearAccount="goToLogin()">
        </core-account-chooser>
        <div class="form-group text-center m-t-20" v-else>
            <div class="col-xs-12">
                <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import errorMixin from '../mixins/errorMixin'
    export default {
        data () {
            return {
                code: '',
                accessToken: '',
                loading: false,
                accounts: [],
            }
        },
        props: {
            promptLabel: {
                type: String,
                required: true
            }
        },
        mixins: [errorMixin],
        mounted () {
            if (this.$route.query.code) {
                this.code = this.$route.query.code
                this.callback()
            }
        },
        methods: {
            goToLogin () {
                this.$emit('back')
            },
            callback () {
                axios.post(this.$coreAuthOptions('baseURL') + '/auth/' + this.$route.query.provider + '/validate', {
                    code: this.code,
                    redirect_url: window.location.origin + window.location.pathname + '?provider=' + this.$route.query.provider
                }).then((response) => {
                    this.accessToken = response.data.data.access_token
                    this.getAccounts(response.data.data.email)
                }, (error) => {
                    this.setErrors(error)
                    this.goToLogin()
                })
            },
            login (account) {
                this.$auth.oauth2({
                    code: true,
                    provider: this.$route.query.provider,
                    data: {
                        access_token: this.accessToken,
                        redirect_url: window.location.origin + window.location.pathname,
                        model: account.model
                    },
                    error: (error) => {
                        this.setErrors(error)
                        this.goToLogin()
                    }
                })
            },
            getAccounts (email) {
                this.loading = true
                this.axios.post(this.$coreAuthOptions('baseURL') + '/auth/accounts', {email: email}).then((response) => {
                    this.accounts = response.data.data
                    if (response.data.data.length === 1) {
                        this.accounts = []
                        this.login(response.data.data[0])
                    }
                    this.loading = false
                }).catch((error) => {
                    this.setErrors(error)
                    this.goToLogin()
                    this.loading = false
                })
            }
        }
    }
</script>
