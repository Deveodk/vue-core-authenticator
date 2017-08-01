<template>
    <div>
        <div v-if="!accounts.length">
            <div class="form-group">
                <div class="col-xs-12 core-account-form">
                    <input type="email"
                           class="form-control"
                           id="email"
                           :placeholder="emailPlaceholder"
                           v-model="data.email"
                           @keyup.enter="getAccounts"
                           ref="email">
                </div>
            </div>

            <div class="form-group text-center m-t-20 core-user-form">
                <div class="col-xs-12">
                    <button @click="getAccounts" :disabled="loading" class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light">
                        <span v-if="!loading">
                            {{nextButton}}
                        </span>
                        <i class="fa fa-circle-o-notch fa-spin fa-fw" v-else></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
           <core-account-chooser @selected="$emit('selected', $event)"
                                 :accounts="accounts"
                                 :promptLabel="promptLabel"
                                 @clearAccount="accounts = []"></core-account-chooser>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: {
                    email: ''
                },
                accounts: [],
                loading: false
            }
        },
        mounted () {
            this.$refs.email.focus()
        },
        props: {
            emailPlaceholder: {
                type: String,
                required: true
            },
            nextButton: {
                type: String,
                required: true
            },
            promptLabel: {
                type: String,
                required: true
            }
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
            getAccounts () {
                this.loading = true
                this.axios.post(this.$coreAuthOptions('baseURL') + '/auth/accounts', this.data).then((response) => {
                    this.accounts = response.data.data
                    if (response.data.data.length === 1) {
                        this.$emit('selected', response.data.data[0])
                    }
                    this.loading = false
                }, (error) => {
                    this.loading = false
                    if (error.response.status === 422) {
                        this.$emit('error', error.response.data)
                    }
                    if (error.response.status === 404) {
                        const formatted = { message: [error.response.data.message] }
                        this.$emit('error', formatted)
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .core-user-form{
        margin-bottom: 20px;
    }
</style>
