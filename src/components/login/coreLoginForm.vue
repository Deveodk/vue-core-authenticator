<template>
    <div>
        <core-account-form v-if="!Object.keys(account).length"
                           :promptLabel="promptLabel"
                           @selected="setAccount($event)"
                           :emailPlaceholder="emailPlaceholder"
                           :nextButton="nextButton"
                           @error="setError($event)">
        </core-account-form>
        <core-password-form v-else @back="account = []"
                ref="passwordForm"
                @error="setError($event)"
                :passwordPlaceholder="passwordPlaceholder"
                :rememberMeLabel="rememberMeLabel"
                :forgotPasswordLabel="forgotPasswordLabel"
                :forgotPasswordRouteName="forgotPasswordRouteName"
                :loginButton="loginButton">
        </core-password-form>
    </div>
</template>
<script>
    import coreAccountForm from "./coreAccountForm.vue";
    import CorePasswordForm from "./corePasswordForm";
    export default {
        components: {
            CorePasswordForm,
            coreAccountForm},
        data () {
            return {
                account: [],
            }
        },
        name: 'coreLoginForm',
        props: {
            promptLabel: {
                type: String,
                required: true
            },
            nextButton: {
                type: String,
                required: true
            },
            emailPlaceholder: {
                type: String,
                required: true
            },
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
        methods: {
            setAccount (account) {
                this.account = account
                setTimeout( () => {
                    this.$refs.passwordForm.data.email = account.email
                    this.$refs.passwordForm.data.model = account.model
                }, 120);

            },
            setError (error) {
                this.$emit('error', error)
            }
        }
    }
</script>
