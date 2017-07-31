<template>
    <div class="core-auth">
        <transition-group name="fade" tag="p">
            <div class="alert alert-danger" role="alert" v-for="error in errors" v-bind:key="error">
                <span class="fa fa-warning" aria-hidden="true"></span>
                {{ error[0] }}
            </div>
        </transition-group>
        <div v-if="!token">
            <core-account-form v-if="!Object.keys(account).length"
                               @selected="setAccount($event)"
                               :emailPlaceholder="emailPlaceholder"
                               :nextButton="resetButton"
                               @error="setError($event)">
            </core-account-form>
            <div v-else>
                <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
            </div>
        </div>
        <div v-else>
            <passwordResetForm :forbiddenText="forbiddenText"
                               :passwordPlaceholder="passwordPlaceholder"
                               :passwordConfirmationPlaceholder="passwordConfirmationPlaceholder"
                               :resetButton="resetButton"
                               @error="setError($event)"
            ></passwordResetForm>
        </div>
    </div>
</template>
<script>
    import coreAccountForm from './login/coreAccountForm.vue'
    import passwordResetForm from './login/passwordResetForm.vue'
    import axios from 'axios'
    export default {
        name: 'makeResetLink',
        components: {
            coreAccountForm,
            passwordResetForm
        },
        props: {
            emailSent: {
                type: String,
                default: 'An email has been sent, press the link to reset'
            },
            emailPlaceholder: {
                type: String,
                default: 'Email'
            },
            actionButton: {
                type: String,
                default: 'reset'
            },
            resetUrl: {
                type: String,
                default: window.location.origin + '/forgot_password'
            },
            resetButton: {
                type: String,
                default: 'reset'
            },
            forbiddenText: {
                type: String,
                default: 'Forbidden'
            },
            passwordPlaceholder: {
                type: String,
                default: 'New password'
            },
            passwordConfirmationPlaceholder: {
                type: String,
                default: 'Repeat password'
            }
        },
        mounted () {
            this.setLocation()
            this.checkForToken()
        },
        data () {
          return {
              data: {
                  email: '',
                  model: '',
                  url: ''
              },
              token: this.$route.query.token,
              errors: [],
              account: []
          }
        },
        methods: {
            setLocation () {
              this.data.url = this.resetUrl
            },
            makeLink () {
                axios.post(this.$coreAuthOptions('baseURL') + '/auth/reset_password', this.data).then((response) => {
                    this.$router.push({ name: 'Login' })
                    this.$toastr('success', this.emailSent, 'success')
                }, (error) => {
                    this.$toastr('error', error.response.data.message, 'error')
                })
            },
            setAccount (account) {
                this.account = account
                this.data.email = account.email
                this.data.model = account.model
                this.makeLink()
            },
            setError (errors) {
                this.errors = errors
            }
        }
    }
</script>
